//尽力了，不会前端，只能用点jquery
$(document).ready(function(){
    var searchbox_clicked = 0
    $("li").click(function(){
      $("#side-navigation-drawer").removeClass("p-side-navigation is-drawer-expanded")
      $("#side-navigation-drawer").addClass("p-side-navigation")
      $("#side-navigation-drawer").addClass("is-drawer-collapsed is-drawer-hidden")
      $("#side-navigation-drawer").addClass("is-drawer-hidden")
    });
  });
  
  $(function () {
    $(window).scroll(function () {
            var scroHei = $(window).scrollTop();//滚动的高度
            if (scroHei > 400) {
                $(".toTop").fadeIn(500);
            }
            else {
                $(".toTop").fadeOut(500);
            }
        });
    });

(function ($) {
    //    $.fn===$.prototype,把fixDiv方法扩展到了对象的prototype上
    //        搜索框定位
            $.fn.fixDiv = function (options) {
                var defaultVal = {
                    top: 20
                }
                var obj = $.extend(defaultVal, options)
                $this = this;
                var _top = $this.offset().top;
                var _left = $this.offset().left;
                $(window).scroll(function () {
                    var _scrollTop = $(document).scrollTop();
                    if (_scrollTop > _top) {
                        $this.offset({
                            top: _scrollTop + obj.top,
                            left: _left
                        });
                    } else {
                        $this.offset({
                            top: _top,
                            left: _left
                        });
                    }
                });
                return this;
            }
        }(jQuery))
        
        $(function () {
            //        调用fixDiv方法
                    //$('.search').fixDiv({top: 10});
                    //$('#key-word').fixDiv({top: 10});
                    //$('.search').fixDiv({top: 10});
                    $('#search-button').click(hightLight);
            //        回车进行搜索
                    $('.key-word').keydown(function (e) {
                        var key = e.which;
                        if (key == 13) hightLight();
                    })
             
                    var index = 0;
                    var historyText;
             
                    function hightLight() {
                        clearSelection();
                        var flag = 0;
             
                        var inpText = $('#key-word').val();
                        var regExp = new RegExp(inpText, 'g');
                        var content = $('#main-content').text();
                        if ($.trim(inpText) == '') {
                            showTips('请输入查找内容');
                            return;
                        }
                        if (!regExp.test(content)) {
                            showTips('未找到匹配项');
                            return;
                        } else {
                            if (historyText != inpText) {
                                index = 0;
                                historyText = inpText;
                            }
                        }
                        $('#main-content p').each(function () {
                                var html = $(this).html();
                                var newhtml = html.replace(regExp, '<span class="highlight">' + inpText + '</span>');
                                $(this).html(newhtml);
                                flag = 1;
                        })
                        if (flag == 1) {
                            var _top = $(".highlight").eq(index).offset().top;
                            $(".highlight").eq(index).addClass('select').siblings('.highlight').removeClass('select');
                            //$("#search-button").html("查找下一个");
                            $("html, body").animate({scrollTop: _top-50});
                            index++;
                            //alert(index)
                            if (index > $(".highlight").size - 1) {
                                index = 0;
                            }
                            //alert(index)
                        }
                    }
            //    清除选择
                    function clearSelection() {
                        $('#main-content p').each(function () {
                            $(this).find('.highlight').each(function () {
                                $(this).replaceWith($(this).html());
                            })
                        })
                    }
            //    显示提示信息
                    function showTips(text) {
                        $('.search .searchTip').text(text);
                        $('.search .searchTip').removeClass('disshow').show();
                        setTimeout(function () {
                            $('.search .searchTip').fadeOut()
                        }, 2000);
                    }
                })    
                

                // var name = document.getElementById("name").value;
                // $(document).ready(function(){
                //     $("search-button").click(function(){
                //         var regExp = new RegExp(inpText, 'g');
                //         var content = $('#main-content').text();
                //     })
                // })
                
                


                  