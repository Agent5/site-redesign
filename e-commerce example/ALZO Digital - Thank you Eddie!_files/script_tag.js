(function(){

  var loadScript = function(url, callback){

    var script = document.createElement("script");
    script.type = "text/javascript";

    // If the browser is Internet Explorer.
    if (script.readyState){
      script.onreadystatechange = function(){
        if (script.readyState == "loaded" || script.readyState == "complete"){
          script.onreadystatechange = null;
          callback();
        }
      };
    // For any other browser.
    } else {
      script.onload = function(){
        callback();
      };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);

  };

  var myAppJavaScript = function($){
    $('ul.fd-product-tabs').each(function() {
      var active, content, links = $(this).find('a');
      active = links.first().addClass('fd-product-tab-active');
      content = $(active.attr('href'));
      links.not(':first').each(function () {
        $($(this).attr('href')).hide();
      });
      $(this).find('a').click(function(e){
        active.removeClass('fd-product-tab-active');
        content.hide();
        active = $(this);
        active.addClass('fd-product-tab-active');
        content = $($(this).attr('href'));
        content.show();
        e.preventDefault();
        return false;
      });
    });
  };

  if ((typeof jQuery === 'undefined') || (parseFloat(jQuery.fn.jquery) < 1.7)) {
    loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function(){
      jQuery191 = jQuery.noConflict(true);
      myAppJavaScript(jQuery191);
    });
  } else {
    myAppJavaScript(jQuery);
  }

})();