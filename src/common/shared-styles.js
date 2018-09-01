import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
      .card {
        margin: 24px;
        padding: 16px;
        color: #757575;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      }

      :root {
        --primary-color: #4285f4;
      }

      a, paper-button {
        font-weight: bold;
      }

      a {
        color: var(--primary-color);
      }

      paper-button {
        color: #fff;
      }

      paper-button.primary {
        background: var(--primary-color);
      }

      blockquote {
        border-left: 4px solid #eee;
        margin-left: 4px;
        padding-left: 20px;
      }

      h1 {
        margin: 16px 0;
        color: #212121;
        font-size: 22px;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);