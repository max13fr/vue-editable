(function() {
    var ENTER_KEY = 13, ESCAPE_KEY = 27;

    var VueEditable = {
        install: function(Vue) {
            Vue.prototype.$editable = function(e, callback) {
                var target = e.target;
                // save old content
                var old_value  = target.innerText;
                target.innerHTML = "<input type='text' value='" + old_value + "' id='_editable' style='width:100%;box-sizing:border-box;background:transparent;font-size:13px;color:red;text-align:center'>";
                var input = document.getElementById('_editable');

                input.focus();
                var len = input.value.length;
                if (document.selection) {
                    var sel = input.createTextRange();
                    sel.moveStart('character', len);
                    sel.collapse();
                    sel.select();
                } else if (typeof input.selectionStart == 'number' && typeof input.selectionEnd == 'number') {
                    input.selectionStart = input.selectionEnd = len;
                }

                var edition_done = function(evt) {
                    if (evt.type == 'keyup' && evt.keyCode != ENTER_KEY && evt.keyCode != ESCAPE_KEY) {
                        return;
                    }

                    if (evt.type == 'keyup' && evt.keyCode == ESCAPE_KEY) { // reset
                        // remove input & show old text
                        target.innerHTML = old_value;
                    }
                    else { // saving
                        // call callback only if value changed
                        if (this.value != old_value) {
                            callback(this.value)
                        }

                        // remove input & show new text
                        target.innerHTML = this.value;
                    }

                    // remove events
                    input.removeEventListener('blur', edition_done, false);
                    input.removeEventListener('keyup', edition_done, false);
                };

                input.addEventListener('blur', edition_done, false);
                input.addEventListener('keyup', edition_done, false);
            }
        }
    };
	
    if (typeof exports == "object") {
        module.exports = VueEditable;
    }
    else if (typeof define == "function" && define.amd) {
        define([], function() {
            return VueEditable;
        });
    }
    else if (window.Vue) {
        window.VueEditable = VueEditable;
        Vue.use(VueEditable);
    };
})();
