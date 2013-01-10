$(function() {
  var Email = (function() {
    var
      $url = $("#url"),
      $urlList = $("#urls"),
      urls = [
        {url: 'qweqwe', saved: false},
        {url: 'sfsdf', saved: false}
      ];

    const ENTER_KEY = 13;

    var attachHandlers = function() {
      $url.on("keyup", handlers.onKeyUp);
      $urlList.on("newUrl", handlers.onNewUrl);
    };

    var handlers = {
      onKeyUp: function(e) {
        if (e.which != ENTER_KEY) {
          return false;
        }

        var url = Url.parse($(this).val());
        console.log(url);
        if (url) {
          $urlList.trigger("newUrl", [url]);
          $url.val("");
        }
      },

      onNewUrl: function(e, url) {
        console.log('called: ' + url);
        var existingUrl = $.grep(urls, function(elem) {
          return elem.url == url;
        });

        if (existingUrl.length == 0) {
          urls.push({
            url: url,
            saved: false
          });
//          $urlList.prepend("<li>" + url + "</li>").css({color: '#FFD800'}).animate({color: '#bdbdbd'}, 5000);
          $urlList.prepend("<li>" + url + "</li>").find("li:first").css({color: '#FFD800'}).animate({color: '#bdbdbd'}, 500);
        }
      }
    };

    return {
      init: function() {
        $url.focus();
        attachHandlers();
      },
      save: function() {
        var notSavedUrls = $.grep(urls, function(url) {
          return ! url.saved;
        });
        console.log(notSavedUrls);
        var postUrls = $.map(notSavedUrls, function(url) {
          return url.url;
        });
        console.log(postUrls);
        $.post("/main/create.json", {urls: postUrls}, function(data) {
          console.log(data);
        }, "json");
      }
    }
  })();

  var Url = (function() {
    var _url;
    var isValid = function() {
      var urlRegexp = '(?:(?:ht|f)tps?://)?(?:[\\-\\w]+:[\\-\\w]+@)?(?:[0-9a-z][\\-0-9a-z]*[0-9a-z]\\.)+[a-z]{2,6}(?::\\d{1,5})?(?:[?/\\\\#][?!^$.(){}:|=[\\]+\\-/\\\\*;&~#@,%\\wА-Яа-я]*)?';
//      console.log('url: ' + (new RegExp('^' + urlRegexp + '$', 'i')).test(_url));
      return (new RegExp('^' + urlRegexp + '$', 'i')).test(_url);
    };

    var trim = function() {
      var result;
      var parts = _url.split('/');
//      console.log('slice:' + parts);
      if (/(http:|ftp:|https:)/.test(parts[0])) {
        result = parts[0] + '//' + parts[2];
      } else {
        result = parts[0];
      }
      return result;
    };

    return {
      /**
       * Returns parsed url or false if not valid
       * @param url
       * @return string|false
       */
      parse: function(url) {
        _url = url;
        if ( ! isValid()) {
          return false;
        }
        return trim();
      }
    }
  })();

  Email.init();

//  setInterval(Email.save, 2000)
  setTimeout(Email.save, 200)
});