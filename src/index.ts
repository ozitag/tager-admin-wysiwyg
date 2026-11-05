import {
  Alignment,
  Autoformat,
  BlockQuote,
  Bold,
  ClassicEditor,
  Code,
  CodeBlock,
  Essentials,
  GeneralHtmlSupport,
  Heading,
  HtmlEmbed,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  MediaEmbedToolbar,
  Paragraph,
  PasteFromOffice,
  SourceEditing,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableProperties,
  TableToolbar,
  TextTransformation,
  Underline,
  type EditorConfig,
} from "ckeditor5";

import StickyToolbarInScrollableContainer from "./sticky-toolbar-in-scrollable-container";

import "ckeditor5/ckeditor5.css";

export { STICKY_PANEL_LIMITER_ATTRIBUTE } from "./sticky-toolbar-in-scrollable-container";
export { StickyToolbarInScrollableContainer };

export class TagerEditor extends ClassicEditor {}

TagerEditor.builtinPlugins = [
  Alignment,
  Autoformat,
  BlockQuote,
  Bold,
  Code,
  CodeBlock,
  Essentials,
  GeneralHtmlSupport,
  Heading,
  HtmlEmbed,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  MediaEmbedToolbar,
  Paragraph,
  PasteFromOffice,
  SourceEditing,
  StickyToolbarInScrollableContainer,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableProperties,
  TableToolbar,
  TextTransformation,
  Underline,
];

const defaultConfig: EditorConfig = {
  // Самостоятельный хостинг под GPL. Платного ключа у проекта нет, поэтому
  // в углу редактора будет логотип «Powered by CKEditor» — убирается только
  // коммерческой лицензией.
  licenseKey: "GPL",

  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "sourceEditing",
      "|",
      "heading",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "code",
      "subscript",
      "superscript",
      "link",
      "bulletedList",
      "numberedList",
      "alignment",
      "|",
      "outdent",
      "indent",
      "|",
      "insertImage",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "codeBlock",
      "htmlEmbed",
    ],
  },

  // Раньше эти подписи правились патчем на headingediting, хотя heading.options
  // всегда был обычной настройкой. Подписи показывают реальный тег, потому что
  // h1 на странице занят заголовком страницы, а в редакторе первый доступный
  // уровень — h2.
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
      { model: "heading1", view: "h2", title: "Heading 1 - <h2>", class: "ck-heading_heading1" },
      { model: "heading2", view: "h3", title: "Heading 2 - <h3>", class: "ck-heading_heading2" },
      { model: "heading3", view: "h4", title: "Heading 3 - <h4>", class: "ck-heading_heading3" },
    ],
  },

  image: {
    toolbar: [
      "imageTextAlternative",
      "imageStyle:inline",
      "imageStyle:block",
      "imageStyle:side",
      "linkImage",
    ],
  },

  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableProperties",
      "tableCellProperties",
      "toggleTableCaption",
    ],
  },

  mediaEmbed: {
    previewsInData: true,
  },

  htmlSupport: {
    allow: [{ name: /.*/, attributes: true, classes: true, styles: true }],
  },

  language: "en",
};

TagerEditor.defaultConfig = defaultConfig;

export { defaultConfig };

export default TagerEditor;
