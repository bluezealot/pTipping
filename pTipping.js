(function($){
    var randomId = function(){
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };

    var pTipIn = function(e){
        var text = $(e.currentTarget).data('title');
        if(text && !$(e.currentTarget).prop('readOnly')){
            var tgt = $(e.currentTarget),
                pos = tgt.position();
            pos.left += tgt[0].offsetWidth + 10;

            if(!tgt.attr('pTip-id')){
                tgt.attr('pTip-id', randomId());
            }

            var tip = '<div class="ptip" style="top:' + pos.top +'px;left:' + pos.left + 'px;display:none;font-size:' + tgt.css('font-size') + ';" data-target="' + tgt.attr('pTip-id') + '">' + text + '</div>';
            $('body').append(tip);
            $('.ptip').fadeIn(300);
        }
    };

    var pTipOut = function(e){
        var id = $(e.currentTarget).attr('pTip-id');
        $('div[data-target="' + id + '"]').remove();
    };

    $.fn.pTip = function(){
        return this.each(function(k, o){
            var o = $(o),
                actions = $(o).data('actions');
            if(!actions || actions.length <= 0){
                actions = ['hover'];
            }
            for(var i = 0; i < actions.length; i++){
                switch(actions[i]){
                    case 'hover':
                        console.log('Applying hover', o);
                        o.hover(pTipIn, pTipOut);
                        break;
                    case 'focus':
                        console.log('Applying focus', o);
                        o.focus(pTipIn);
                        o.blur(pTipOut);
                        break;
                    default:
                        break;
                }
            }
        });
    };
}(jQuery));