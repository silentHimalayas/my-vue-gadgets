<template>
  <div class="quill-edit-container">
    <div class="mudule-name">vue-quill-edit  demo</div>
    <quill-editor 
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)">
    </quill-editor>
  </div>
</template>
<script>
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
// 引入图片扩展功能
import { ImageDrop } from 'quill-image-drop-module';
// import { ImageResize } from 'quill-image-resize-module/image-resize.min.js';


Quill.register('modules/imageDrop', ImageDrop);
// Quill.register('modules/imageResize', ImageResize);



export default {
  components: {
    quillEditor
  },
  data () {
    return {
      name: 'edit',
      editorOption: {
        modules: {
          imageDrop: true,
          // ImageResize: {}
        }
      },
      content: ''
    }
  },
  methods: {
    onEditorBlur (e) {
      window.console.log(e, '>>>>>>onEditorBlur')
    },
    onEditorFocus (e) {
      window.console.log(e, '>>>>>>onEditorFocus')
    },
    onEditorReady (e) {
      window.console.log(e, '>>>>>>onEditorReady')
    }
  }
}
</script>

<style lang='less'>
.quill-edit-container {
  color: #333;
}
</style>
