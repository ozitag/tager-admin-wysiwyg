import { Plugin } from "ckeditor5";

/**
 * Атрибут, которым вёрстка админки помечает скроллящийся контейнер, внутри
 * которого должен липнуть тулбар.
 */
export const STICKY_PANEL_LIMITER_ATTRIBUTE = "data-sticky-panel-limiter";

function findScrollableAncestors(element: HTMLElement): Array<HTMLElement> {
  const result: Array<HTMLElement> = [];

  let current = element.parentElement;

  while (current) {
    const overflowY = window.getComputedStyle(current).getPropertyValue("overflow-y");

    if (overflowY === "auto" || overflowY === "scroll") {
      result.push(current);
    }

    current = current.parentElement;
  }

  return result;
}

/**
 * Прижимает тулбар к верху скроллящегося контейнера, а не окна.
 *
 * Штатный StickyPanelView считает смещение от вьюпорта и слушает скролл
 * окна. В админке редактор лежит внутри своей скроллящейся области, поэтому
 * при прокрутке тулбар либо уезжал вверх за пределы видимой части, либо
 * оставался на месте, пока прокручивали контейнер, — апстрим это до сих пор
 * не чинит (ckeditor5#18328, ckeditor5#20265).
 *
 * Раньше поведение добивалось патчем самого StickyPanelView через
 * patch-package: 174 строки, переписывающие приватные методы и шаблонные
 * привязки класса. Патч держался за внутренности и не пережил бы ни одного
 * обновления CKEditor. Здесь то же самое делается снаружи, через публичное
 * наблюдаемое свойство editor.ui.viewportOffset.
 */
export default class StickyToolbarInScrollableContainer extends Plugin {
  public static get pluginName() {
    return "StickyToolbarInScrollableContainer" as const;
  }

  private _cleanup: Array<() => void> = [];

  public init(): void {
    const editor = this.editor;

    editor.on("ready", () => {
      const limiter = document.querySelector<HTMLElement>(
        `[${STICKY_PANEL_LIMITER_ATTRIBUTE}]`
      );

      // Нет размеченного контейнера — поведение штатное, ничего не трогаем.
      if (!limiter) {
        return;
      }

      const element = editor.ui.getEditableElement();

      if (!element) {
        return;
      }

      const sync = () => {
        const top = limiter.getBoundingClientRect().top;

        editor.ui.viewportOffset = {
          ...editor.ui.viewportOffset,
          top: top > 0 ? top : 0,
        };
      };

      const targets: Array<HTMLElement | Window> = [
        ...findScrollableAncestors(element),
        window,
      ];

      for (const target of targets) {
        target.addEventListener("scroll", sync, { passive: true });
        this._cleanup.push(() => target.removeEventListener("scroll", sync));
      }

      const resizeObserver = new ResizeObserver(sync);
      resizeObserver.observe(limiter);
      this._cleanup.push(() => resizeObserver.disconnect());

      sync();
    });
  }

  public override destroy(): void {
    for (const off of this._cleanup) {
      off();
    }

    this._cleanup = [];

    super.destroy();
  }
}
