(function($){
    var randomId = function(){
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };

    var pTipIn = function(e){
        var cTarget = $(e.currentTarget),
            text = cTarget.data('h-tip') || cTarget.data('f-tip');
        if(text && !cTarget.prop('readOnly')){
            var tgt = cTarget,
                pos = tgt.position();
            pos.left += tgt[0].offsetWidth + 10;

            if(!tgt.attr('pTip-id')){
                tgt.attr('pTip-id', randomId());
            }

            var tip = '<div class="ptip" style="top:' + pos.top
                + 'px;left:' + pos.left
                + 'px;display:none;font-size:' + tgt.css('font-size')
                + ';" data-target="' + tgt.attr('pTip-id')
                + '">' + text + '</div>';
            $('body').append(tip);
            $('.ptip').fadeIn(300);
        }
    };

    var pTipOut = function(e){
        var id = $(e.currentTarget).attr('pTip-id');
        $('div[data-target="' + id + '"]').remove();
    };

    var getType = function(ele){
        var field;

        if (ele.data('h-tip')) {
            field = 'hover';
        }else if (ele.data('f-tip')) {
            field = 'focus';
        }
        return field;
    };

    $.fn.pTip = function(){
        return this.each(function(k, v){
            var o = $(v),
                action = getType(o);
            switch(action){
                case 'hover':
                    o.hover(pTipIn, pTipOut);
                    break;
                case 'focus':
                    o.focus(pTipIn);
                    o.blur(pTipOut);
                    break;
                default:
                    break;
            }
        });
    };
}(jQuery));