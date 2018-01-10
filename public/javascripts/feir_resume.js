! function (win, $) {
    // skill charts
    var skill_chart = $('.chart_item');
    var labelTop = {
        normal: {
            color: '#34cf75',
            label: {
                show: true,
                position: 'center',
                formatter: function (params) {
                    return params.value + '%';
                },
                textStyle: {
                    fontsize: 32,
                    baseline: 'bottom'
                }
            },
            labelLine: {
                show: false
            }
        }
    };
    var labelFromatter = {
        normal: {
            label: {
                formatter: function (params) {
                    return 100 - params.value + '%'
                },
                textStyle: {
                    fontSize: '43',
                    baseline: 'top'
                }
            }
        },
    }
    var labelBottom = {
        normal: {
            color: 'rgba(0,0,0,0)'
        },
        emphasis: {
            color: 'rgba(0,0,0,0)'
        }
    };
    var radius = ['60%', '67%'];
    var option = {
        'ui': {
            series: [{
                type: 'pie',
                center: ['50%', '50%'],
                radius: radius,
                itemStyle: labelFromatter,
                data: [{
                        name: 'other',
                        value: 6,
                        itemStyle: labelBottom
                    },
                    {
                        name: 'UI',
                        value: 94,
                        itemStyle: labelTop
                    }
                ]
            }]
        },
        'ue': {
            series: [{
                type: 'pie',
                center: ['50%', '50%'],
                radius: radius,
                itemStyle: labelFromatter,
                data: [{
                        name: 'other',
                        value: 10,
                        itemStyle: labelBottom
                    },
                    {
                        name: 'UI',
                        value: 90,
                        itemStyle: labelTop
                    }
                ]
            }]
        },
        'icon_design': {
            series: [{
                type: 'pie',
                center: ['50%', '50%'],
                radius: radius,
                itemStyle: labelFromatter,
                data: [{
                        name: 'other',
                        value: 10,
                        itemStyle: labelBottom
                    },
                    {
                        name: 'UI',
                        value: 90,
                        itemStyle: labelTop
                    }
                ]
            }]
        },
        'fe': {
            series: [{
                type: 'pie',
                center: ['50%', '50%'],
                radius: radius,
                itemStyle: labelFromatter,
                data: [{
                        name: 'other',
                        value: 20,
                        itemStyle: labelBottom
                    },
                    {
                        name: 'UI',
                        value: 80,
                        itemStyle: labelTop
                    }
                ]
            }]
        }
    };
    skill_chart.each(function (i, item) {
        var chrt = echarts.init(item);
        var type = $(item).data('skill');
        chrt.setOption(option[type]);
    });
}(window, jQuery);

// 展示作品
! function (win, $) {
    var portfolio = $('#portfolio');
    var handler = $('#imgbox').find('.handeler');
    var current_index = 0;
    var portfolio_list;
    portfolio.on('click', '.column', function () {
        var self = $(this);
        var img_src = self.data('img_src');
        current_index = self.index();
        var portfolio_description = self.find('img').attr('alt') || '暂无描述';
        loadImage(img_src, portfolio_description);
    });
    handler.on('click', function () {
        if(!portfolio_list) portfolio_list = $('#portfolio').find('.column');
        var current, prev, next, src, description;
        if (current_index == 0) {
            prev = portfolio_list.length - 1;
            next = 1;
        } else if (current_index == portfolio_list.length - 1) {
            prev = current_index - 1;
            next = 0;
        } else {
            prev = current_index - 1;
            next = current_index + 1;
        }
        current = $(this).hasClass('prev') ? prev : next;
        src = portfolio_list.eq(current).data('img_src');
        description = portfolio_list.eq(current).find('img').attr('alt');
        loadImage(src, description, function () {
            current_index = current;
        });
    });

    function loadImage(src, description, callback) {
        var image_modal = $('.show_portfolio');
        image_modal.modal('show');
        var img_container = image_modal.find('.img_container');
        var ratio = img_container.height() / img_container.width().toFixed(3);
        img_container.find('img').addClass('hidden');
        image_modal.find('.loading').show();
        var img = new Image();
        img.src = src;
        img.className = 'hidden';
        $(img).on('load', function () {
            var img_ratio = (img.naturalHeight / img.naturalWidth).toFixed(3);
            if (img_ratio < ratio) {
                $(this).width('100%');
            } else {
                $(this).height('100%');
            }
            image_modal.find('p.description').text(description);
            image_modal.find('.loading').hide();
            img_container.html($(this));
            setTimeout(function () {
                image_modal.find('.hidden').removeClass('hidden');
            }, 100);
            typeof callback === 'function' ? callback() : null;
        });
    }
}(window, jQuery);

// 动态渲染
(function (WIN, $) {
    var experience_tpl = document.getElementById('experienceTpl').innerText
    var works_tpl = document.getElementById('worksTpl').innerText
    $(function () {
        $.get('/public/data/experience.json', function(res) {
            if(res && res.code === 0) {
                var experience = Mustache.render(experience_tpl, res)
                $('#experience').append(experience)
            }
        })
        $.get('/public/data/my_works.json', function(res) {
            console.log(res)
            if(res && res.code === 0) {
                var works = Mustache.render(works_tpl, res)
                $('#portfolio').append(works)
            }
        })
    })
})(window, jQuery)