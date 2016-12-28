/**
 * @file mip-mz-appdownload 木子的app下载切换效果
 * @author pifire
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
	var browser = {
        versions: (function () {
            var u = navigator.userAgent;
            return {
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
                android: u.indexOf('Android') > -1, // android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, // 是否iPad
                ios9: u.indexOf('iPhone OS 9') > -1,
                MQQBrowser: u.indexOf('MQQBrowser') > -1, // 是否MQQBrowser
                UCBrowser: u.indexOf('UCBrowser') > -1, // UCBrowser
                Safari: u.indexOf('Safari') > -1
            };
        })(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
		// this.element 可取到当前实例对应的 dom 元素
        var element = this.element;
        var $element = $(element);
		$.ajax({
			method: 'get',
			data: {
				keys: keys,
				id: that.webInfoId,
				platform: curPlatform,
				pid: pid,
				cid: (typeof (that.webInfoCid) !== 'undefined') ? that.webInfoCid : 0,
				rid: (typeof (that.webInfoRid) !== 'undefined') ? that.webInfoRid : 0,
				rcid: rCid,
				rrid: rRid
			},
			url: 'https://apis.pc6.com/ajax.asp?action=998',
			dataType: 'json',
			success: function (data) {
				if (typeof data.list === 'undefined') {
					return;
				}
				var list = data.list;
				var lisHttml = '';
				if (curPlatform === 0) {
					for (var i = 0; i < list.length; ++i) {
						lisHttml += '<li><a href="http://m.pc6.com/down.asp?id=' + list[i].ID + '"><mip-img src="'
						+ list[i].SmallImg + '" onclick="_czc.push([\'_trackEvent\',\'tuijian\',\'tuijian'
						+ (i + 1) + '\',\'' + list[i].ResName + '\'])"></mip-img>'
						+ list[i].ResName + '</a></li>';
					}
				}
				else if (curPlatform === 1) {
					for (var i = 0; i < list.length; ++i) {
						lisHttml += '<li><a href="http://m.pc6.com/mipd/' + list[i].ID + '.html" target="_blank"><mip-img src="'
						+ list[i].SmallImg + '" onclick="_czc.push([\'_trackEvent\',\'tuijian\',\'tuijian'
						+ (i + 1) + '\',\'' + list[i].ResName + '\'])"></mip-img>'
						+ list[i].ResName + '</a></li>';
					}
				}
				$('.tjyxph #thelist3').append(lisHttml);
			},
			error: function () {}
		});
		
		
        var ad = $element.attr('ad');
        var aid = $element.attr('aid');
        var addr = $element.attr('addr');
        var wdjDN = 'http://dl.wandoujia.com/files/jupiter/latest/wandoujia-fangbei8_ad.apk';
        var text1 = '\u4f7f\u7528\u8c4c\u8c46\u835a\u5b89\u88c5';
        var text2 = '\u8c4c\u8c46\u835a\u662f\u5168\u9762\u3001\u4e13\u4e1a\u7684'
		+ '\u5e94\u7528\u5e02\u573a\uff0c\u5c06\u4e3a\u60a8\u5b89\u88c5\u8c4c\u8c46\u835a'
		+ '\uff0c\u542f\u52a8\u9ad8\u901f\u5f15\u64ce\uff0c\u5b89\u5168\u65e0\u6bd2\u3001'
		+ '\u6781\u901f\u4e0b\u8f7d\u5e94\u7528\uff01';
        var text3 = '\u4f7f\u7528\u666e\u901a\u4e0b\u8f7d\u65e0\u6cd5\u907f\u514d'
		+ '\u6d41\u91cf\u52ab\u6301\u3001\u4e0b\u8f7d\u8f83\u6162\u7b49\u95ee\u9898\uff0c\u5efa'
		+ '\u8bae\u9009\u62e9\u8c4c\u8c46\u835a\u5b89\u88c5\u9ad8\u901f\u4e0b\u8f7d\uff01';
        var innerHTML = '';
        var trueurl;
        if (ad > 0) {
            innerHTML = '<i>' + text1 + '</i>'
				+ '<a href="' + wdjDN + '">\u9ad8\u901f\u4e0b\u8f7d</a>'
				+ '<p >' + text2 + '</p>'
				+ '<u style="display: none;">' + text3 + '</u>';
            if (addr == null) {
                trueurl = 'http://www.mobile-dad.com/tourl.php?apkid=' + $element.attr('aid');
            }
			else {
                trueurl = 'http://www.mobile-dad.com/tourl.php?apkid=' + aid;
            }
        }
		else {
            if (addr == null) {
                window.location.href = 'http://www.mobile-dad.com/tourl.php?apkid=' + $element.attr('aid');
                innerHTML = '<a href="' + addr + '" class="pt">\u7acb\u5373\u4e0b\u8f7d</a>';
            }
			else {
                innerHTML = '<a href="http://www.mobile-dad.com/tourl.php?apkid=' + aid + '" class="pt">\u7acb\u5373\u4e0b\u8f7d</a>';
            }
        }
        $element.html(innerHTML);
        var flag = 1;
        $element.on('click', 'i', function () {
            if (flag === 1) {
                $element.addClass('no');
                $element.find('a').text('\u666e\u901a\u4e0b\u8f7d');
                $element.find('a').attr('href', trueurl);
                $element.find('p').attr('style', 'display:none');
                $element.find('u').attr('style', 'display:block');
                flag = 0;
            }
			else {
                $element.removeClass('no');
                $element.find('a').text('\u9ad8\u901f\u4e0b\u8f7d');
                $element.find('a').attr('href', wdjDN);
                $element.find('p').attr('style', 'display:block');
                $element.find('u').attr('style', 'display:none');
                flag = 1;
            }
        });
    };
    return customElement;
});
