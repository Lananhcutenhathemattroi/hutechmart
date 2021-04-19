(function ($) {
    function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    var banner = $("#webinar-banner");
    var bannerLink = banner.find("a");
    var trackingAttribute = "data-gtm-event";
    var uniqueLocalStorageBannerKey = "KendoUI2018R1";
    var bannerExpiresAt = Date.UTC(2019, 0, 25); // 25th of Jan, 2019
    var showWebinarBanner = true;
    var suites = {
        // "suite": "trackingAttribute"
        "/kendo-demos/": "yellow-strip, KendoUI2018R1ExportWebinar, kendo-overview-page", // for localhost only
        "kendo-demos/": "yellow-strip, KendoUI2018R1ExportWebinar, kendo-demos-page", // for localhost only
        "/kendo-ui/": "yellow-strip, KendoUI2018R1ExportWebinar, kendo-overview-page", // Kendo UI Demos Overview page only
        "kendo-ui/": "yellow-strip, KendoUI2018R1ExportWebinar, kendo-demos-page",
        "aspnet-mvc/": "yellow-strip, KendoUI2018R1ExportWebinar, mvc-demos-page",
        "php-ui/": "yellow-strip, KendoUI2018R1ExportWebinar, php-demos-page",
        "jsp-ui/": "yellow-strip, KendoUI2018R1ExportWebinar, jsp-demos-page"
    };

    for (var j in suites) {
        var isOverviewKey = (j === "/kendo-ui/" || j === "/kendo-demos/" || j === "/php-ui/" || j === "/jsp-ui/");
        var containsKey = location.href.indexOf(j) > 0;
        var endsWithKey = endsWith(location.href, j);

        if (containsKey && (isOverviewKey && endsWithKey || !isOverviewKey && !endsWithKey)) {
            try {
                showWebinarBanner = (typeof bannerExpiresAt == "undefined" || bannerExpiresAt > (new Date()).getTime()) && ("1" !== localStorage.getItem(uniqueLocalStorageBannerKey));
            } catch (e) {
            }

            if (showWebinarBanner) {
                bannerLink.attr(trackingAttribute, suites[j]);
                banner.css("display", "flex").find(".close").click(function () {
                    try {
                        localStorage.setItem(uniqueLocalStorageBannerKey, 1);
                        banner.animate({ height: 0 }, function () {
                            banner.hide();
							banner.remove();
                            $(window).resize();
                        });
                        return true;
                    } catch (e) {
                    }
                });

				$(window).scroll(function() {
					var bannerHeight = banner.outerHeight();

					if ($(this).scrollTop() > bannerHeight) {
						banner.stop(true).fadeOut(10);
					} else if ($(this).scrollTop() < bannerHeight + 200) {
                        banner.stop(true)
                        .css("display", "flex")
                        .hide()
                        .fadeIn(50);
					}

					$(window).resize();
				});
            }
            break;
        }
    }


})($);