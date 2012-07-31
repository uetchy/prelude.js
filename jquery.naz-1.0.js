/*
 * Naz - jQuery Plugin
 * Simple preloader
 *
 * Examples and document at http://oame.github.com/jquery.naz
 *
 * Copyright(C) 2012 oame
 * version: 1.0
 * require: jQuery 1.7.2+
 * license: MIT License
 */

(function(jQuery){
  Array.prototype.remove = function(element) {
    for (var i = 0; i < this.length; i++)
      if (jQuery(this[i]).data("naz-src") == element) this.splice(i, 1); 
  };
  
  function collectNazObjects(){
    var _objects = [];
    jQuery("body *").each(function(){
      if(jQuery(this).data("naz-src") != undefined){
        _objects.push(this);
      }
    });
    return _objects;
  }

  function sniffTags(){
    jQuery("img,audio").each(function(){
      if(typeof jQuery(this).data("naz-src") != "undefined"){
        
      }else if(typeof jQuery(this).attr("src") != "undefined"){
        jQuery(this).attr("data-naz-src", jQuery(this).attr("src"));
      }
    });
  }
  
  function preloadObjects(_objects, callback) {
    var total = _objects.length;
    jQuery(_objects).each(function(){
      var src = jQuery(this).data("naz-src");
      switch(this.tagName){
        case "AUDIO":
        var audio = jQuery("<audio/>").attr("src", src).load();
        audio.on('canplay canplaythrough', function(){
          _objects.remove(src);
          callback(total, total - _objects.length);
        });
        break;
        default:
        jQuery("<img/>").attr("src", src).load(function(){
          _objects.remove(src);
          callback(total, total - _objects.length);
        });
        break;
      }
    });
  }
  
  function replaceObjectsToAppear(_objects){
    jQuery(_objects).each(function(){
      switch(this.tagName){
        case "IMG":
        jQuery(this).attr("src", jQuery(this).data("naz-src"));
        break;
        case "AUDIO":
        jQuery(this).attr("src", jQuery(this).data("naz-src"));
        break;
        default:
        jQuery(this).css("background-image", "url("+jQuery(this).data("naz-src")+")");
        break;
      }
    });
  }

  function autoAssets(){
    var slider = $("<div/>").attr("id", "nz-slider");
    slider.append($("<span/>"));
    var text_layer = $("<div/>").attr("id", "nz-text-layer");
    text_layer.append($("<p/>").attr("id", "nz-text"));
    var wrapper = $("<div/>").attr("id", "nz-wrapper");
    wrapper.append(slider);
    wrapper.append(text_layer);
    $("body").append(wrapper);
  }
  
  var timer, objects, now_perc, displayed_perc, total_count, finished_count, displayed_count, config, animated;
  timer = null;
  objects = [];
  now_perc = 0;
  displayed_perc = 0;
  total_count = 0;
  finished_count = 0;
  displayed_count = 0;
  animated = false;

  // Default configuration
  config = {
    animate: false,
    interval: 20,
    smart_naz: true,
    auto_assets: true,
    animation: { // For :animate
      speed: 1000,
      loadingText: "Loading..."
    },
    nonanimate: { // For :nonanimate
      loadingText: ":percent %"
    }
  };
  
  jQuery.fn.naz = function(options, callback){
    if(typeof callback === 'undefined') callback = null;
    config = jQuery.extend(config, options);
    if(config.smart_naz)sniffTags();
    if(config.auto_assets)autoAssets();
    objects = collectNazObjects();
    total_count = objects.length;
    dupObjects = jQuery.extend(true, [], objects);
    preloadObjects(dupObjects, function(_total, _loaded){
      now_perc = Math.ceil(100 * _loaded / _total);
      finished_count += 1;
    });
    
    animated = true;
    
    if(config.animate){ // For animate
      jQuery("#nz-text").html(config.animation.loadingText);
      timer = window.setInterval(function(){
        if((total_count >= finished_count) && (animated == false)){
          window.clearInterval(timer);
          replaceObjectsToAppear(objects);
          jQuery("#nz-wrapper").fadeOut("slow", function(){
            $(this).trigger("preloaded");
          });
        }else{
          if(displayed_count < finished_count){
            jQuery("#nz-slider > span").stop();
            displayed_count += 1;
            jQuery("#nz-slider > span").animate({width: (displayed_count / total_count)*100 + "%"}, config.speed, function(){
              animated = false;
            });
          }
        }
      }, 
      config.interval);
    }else{ // For :nonanimate
      timer = window.setInterval(function(){
        if(displayed_perc >= 100){
          window.clearInterval(timer);
          replaceObjectsToAppear(objects);
          jQuery("#nz-wrapper").fadeOut("slow", function(){
            $(this).trigger("preloaded");
          });
        }else{
          if (displayed_perc < now_perc){
            displayed_perc += 1;
            jQuery("#nz-text").html(config.nonanimate.loadingText.replace(":percent", displayed_perc));
            jQuery("#nz-slider > span").css("width", displayed_perc + "%");
          }
        }
      }, 
      config.interval);
    }
  }
})(jQuery);