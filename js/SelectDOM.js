/**
 * author : Paulo Henrique
 * 22-01-2019
 */
(function (global) {

    var Atlas = {
        isNames: "Atlas",

        __byVars: {
            __Element: [],
            __Values: {},
        },

        __fadeFocus: {

            active: false,

            /**
             * @param {*} e -> element
             */
            generateFade: function (e) {

                if (!this.active) {
                    $('head').append('<style>.Atlas_Fade{margin:0px;padding:0px;transition: all 0.5s ease-out;height:0px;width:0px;border-radius:0;background-color:rgba(0 ,0 ,0,0);position:absolute;margin-left:auto;margin-right:auto;/*border-width:8vh 159vh 74vh 25vh*/;border-color:rgba(0,0,0,.5);border-style:solid}</style>');
                   
                    $('body').prepend('<div class="Atlas_Fade"></div>')
                    this.active = true;
                    this.__calculateFade(e);

                    return this;
                }
                $('.Atlas_Fade').addClass('Atlas_Fade');
                this.__calculateFade(e);
                return this;
            },
            /**
             * @param {*} e -> element
             */
            __calculateFade: function (e) {

                var x , y , h , w;

                x = e.offset().top - 10 > 0 ? e.offset().top - 10 : 0;
                y = e.offset().left;

                h = e[0].clientHeight + 20;
                w = e[0].clientWidth + 10;

                $('.Atlas_Fade').css("border-width", x + 'px 200vh 200vh ' + y + 'px');

                $('.Atlas_Fade').css("width", w + 'px');
                $('.Atlas_Fade').css("height", h + 'px');

                $('body').css('overflow', 'hidden');
                return this;
            },

            removeFade: function () {
                $('.Atlas_Fade').css("width", '0px');
                $('.Atlas_Fade').css("height", '0px');
                $('.Atlas_Fade').removeClass('Atlas_Fade');
                $('body').css('overflow', 'auto');
                return this;
            }
        },
        /**
         * Pegar o ultimo elemento do array __Element
         */
        __getElement: function () {
            var num = this.__byVars.__Element.length;
            return this.__byVars.__Element[num - 1];
        },

        __addElement : function(value){
            this.__byVars.__Element.push(value);
        },

        by: function () {
            return this;
        },

        className: function () {
            return this;
        },
        /**
         *  pegar elemento html pelo tag name e insere no array __Element
         * @param {*} name 
         */
        name: function (name) {
            var aux = $("[name='" + name + "']");
            if (aux != null) {
                this.__byVars.__Element.push(aux);
            }
            return this;
        },
        /**
         * pegar elemento html pelo ID e insere no array __Element
         * @param {*} id 
         */
        id: function (id) {
            if (!id.includes("#")) {
                id += "#" + id;
            }

            var aux = $(id);
            if (aux != null) {
                this.__byVars.__Element.push(aux);
            }
            return this;
        },
        /**
         * inserir texto no elemento e 
         * @param {*} text 
         * @param {*} e -> element
         */
        setText: function (text, e = null) {

            if (e == null) {
                this.__getElement().val(text);
                return this;
            }

            try {
                if (e.isNames == "Atlas") {
                    this.__getElement().val(text);
                    return this;

                }
                if (e[0].nodeName != "INPUT")
                    throw "elemento inválido";

                e.val(text);

            } catch (e) {
                console.log(e);
                return;
            }
            return this;
        },
        /**
         * gerar Altas focus
         * @param {*} e -> element
         */
        focusElementAdd: function (e = null) {
            if (e == null && this.__getElement() != null) {

                $('html, body').animate({
                    scrollTop: this.__getElement()[0].offsetTop - 100
                }, 500);

                this.__getElement().css('border', '1px solid red');
                this.__fadeFocus.generateFade(this.__getElement());

                return this;
            }
            this.__addElement( e );
            e.css('border', '1px solid red');
            this.__fadeFocus.generateFade(e);
            this.__byVars
            return this;
        },
        /**
         * remove Altas focus
         * @param {*} e 
         */
        focusElementRemove: function (e = null) {
            if (e == null) {
                this.__getElement().css('border', '0px solid red');
                this.__fadeFocus.removeFade();
                return this;
            }

            e.css('border', '0px solid red');
            this.__fadeFocus.removeFade();

            return this;
        }

    }

    global.atlas = Atlas;

})(this);
