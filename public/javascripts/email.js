var Email = (function() {
  var
    $url = $("#url"),
    $urlList = $("#urls"),
    urls = [];

  const ENTER_KEY = 13;

  var attachHandlers = function() {
    $url.on("keyup", handlers.onKeyUp);
    $urlList.on("newUrl", handlers.onNewUrl);
  };

  var addUrl = function(urlObj) {
    urls.push(urlObj);
    addUrlToList(urlObj.url);
  };

  var addUrlToList = function(url) {
    $urlList.prepend("<li>" + url + "</li>").find("li:first").css({color: '#FFD800'}).animate({color: '#bdbdbd'}, 500);
  };

  var handlers = {
    onKeyUp: function(e) {
      if (e.which != ENTER_KEY) {
        return false;
      }

      var url = Url.parse($(this).val());
      if (url) {
        $urlList.trigger("newUrl", [url]);
        $url.val("");
      }
    },

    onNewUrl: function(e, url) {
      var existingUrl = $.grep(urls, function(elem) {
        return elem.url == url;
      });

      if (existingUrl.length == 0) {
        addUrl({
          url: url,
          saved: false
        });
      }
    }
  };

  return {
    init: function() {
      $url.focus();
      attachHandlers();
    },
    setUrls: function(urls) {
      $.each(urls, function(i, url) {
        addUrl({
          url: url,
          saved: true
        });
      });
    } ,
    save: function() {
      var notSavedUrls = $.grep(urls, function(url) {
        return ! url.saved;
      });
      if (notSavedUrls.length == 0) {
        return ;
      }
      var postUrls = $.map(notSavedUrls, function(url) {
        return url.url;
      });
      $.post("/main/create.json", {urls: postUrls}, function(data) {
        $.each(urls, function(i, url) {
          if ($.inArray(url.url, data) != -1) {
            urls[i].saved = true;
          }
        });
      }, "json");
    }
  }
})();

var Url = (function() {
  var _url;
  var isValid = function() {
    var urlRegexp = '(?:(?:ht|f)tps?://)?(?:[\\-\\w]+:[\\-\\w]+@)?(?:[0-9a-z][\\-0-9a-z]*[0-9a-z]\\.)+[a-z]{2,6}(?::\\d{1,5})?(?:[?/\\\\#][?!^$.(){}:|=[\\]+\\-/\\\\*;&~#@,%\\wА-Яа-я]*)?';
    return (new RegExp('^' + urlRegexp + '$', 'i')).test(_url);
  };

  var trim = function() {
    var result;
    var parts = _url.split('/');
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

setInterval(Email.save, 15000);