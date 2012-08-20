/*
 * jQuery Prelude - jQuery Plugin
 * Simple preloader plug-in
 *
 * Examples and document at http://oame.github.com/jquery.prelude
 *
 * Copyright(C) 2012 o_ame - http://oameya.com
 * version: 1.5
 * require: jQuery 1.7.2+
 * license: MIT License
 */

(function($, undefined){
  Array.prototype.remove = function(element){
    for (var i = 0; i < this.length; i++){
      if($(this[i]).data("preload") == element)this.splice(i, 1);
    }
  };

  $prelude = {
    collect_objects: function(node){
      var _objects = [];
      $(node + " *").each(function(){
        if(typeof $(this).data("preload") !== "undefined"){
          _objects.push(this);
        }
      });
      return _objects;
    },
    sniff_tags: function(node){
      $(node + " img,audio").each(function(){
        if(typeof $(this).data("preload") !== "undefined"){

        }else if(typeof $(this).attr("src") !== "undefined"){
          $(this).attr("data-preload", $(this).attr("src"));
        }
      });
    },
    preload_objects: function(_objects, callback) {
      var total = _objects.length;
      $(_objects).each(function(){
        var src = $(this).data("preload");
        if(this.tagName == "AUDIO"){
          var audio = $("<audio/>").attr("src", src).load();
          audio.on('canplay canplaythrough', function(){
            _objects.remove(src);
            callback(total, total - _objects.length);
          });
        }else{
          var img = $("<img/>").attr("src", src);
          var ua = $.browser;
          if(ua.msie && img.width() !=0) {
            _objects.remove(src);
            callback(total, total - _objects.length);
          }else{
            img.load(function(){
              _objects.remove(src);
              callback(total, total - _objects.length);
            });
          }
        }
      });
    },
    replace_objects_to_appear: function(_objects){
      $(_objects).each(function(){
        switch(this.tagName){
          case "IMG":
          $(this).attr("src", $(this).data("preload"));
          break;
          case "AUDIO":
          $(this).attr("src", $(this).data("preload"));
          break;
          default:
          $(this).css("background-image", "url("+$(this).data("preload")+")");
        }
      });
    },
    auto_assets: function(node){
      var wrapper = $("<div/>").attr("id", "prelude-wrapper");
      var slider = $("<div/>").attr("id", "prelude-slider");
      slider.append($("<span/>"));
      if(config.show_text){
        var text_layer = $("<div/>").attr("id", "prelude-text-layer");
        text_layer.append($("<p/>").attr("id", "prelude-text"));
        wrapper.append(text_layer);
      }
      wrapper.append(slider);
      $(node).prepend(wrapper);
    },
    stat_log: function(tag){
      console.log("["+tag+"] displayed_count: "+displayed_count+" finished_count: "+finished_count+" total_count: "+total_count+" now_perc: "+now_perc+" displayed_perc: "+displayed_perc);
    }
  }

  var timer, objects, now_perc, displayed_perc, total_count, finished_count, displayed_count, config;
  timer = null;
  objects = [];
  now_perc = 0;
  displayed_perc = 0;
  total_count = 0;
  finished_count = 0;
  displayed_count = 0;

  /* Default configuration */
  config = {
    animate: true,
    smart_prelude: true,
    auto_assets: true,
    auto_hide: true,
    hide_speed: 1000,
    show_text: true,
    loading_text: ":percent %",
    animation: { // For :animate
      interval: 20,
      speed: 1000
    }
  };

  $.fn.prelude = function(options){
    /* Configure options */
    if(typeof options === "undefined")options = {};
    config = jQuery.extend(config, options);
    config.top_node = $(this).selector;
    config.html = {};
    config.html.wrapper = config.top_node + " > #prelude-wrapper";
    config.html.slider = config.html.wrapper + " > #prelude-slider";
    config.html.indicator = config.html.slider + " > span";
    config.html.text_node = config.html.wrapper + " > #prelude-text-layer > #prelude-text";
    config.html.insersion = ":percent";

    if(config.smart_prelude)$prelude.sniff_tags(config.top_node);
    if(config.auto_assets)$prelude.auto_assets(config.top_node);

    objects = $prelude.collect_objects(config.top_node);
    total_count = objects.length;
    $prelude.preload_objects($.extend(true, [], objects), function(_total, _loaded){
      /* Called when finished loading object */
      now_perc = Math.ceil(100 * _loaded / _total);
      finished_count += 1;
    });

    if(config.animate){ // For animate
      var animated = true;
      timer = window.setInterval(function(){
        if((total_count <= displayed_count) && (animated == false)){
          /* 読み込み終わり */
          window.clearInterval(timer);
          $prelude.replace_objects_to_appear(objects);

          if(config.auto_hide){
              $(config.html.wrapper).fadeOut(config.hide_speed, function(){
                $(config.top_node).trigger("preloaded");
              });
            }else{
              $(config.top_node).trigger("preloaded");
            }
        }else{
          var top_x = parseInt($(config.html.slider).css("width"));
          var now_x = parseInt($(config.html.indicator).css("width"));
          displayed_perc = Math.ceil(now_x / top_x * 100);
          $(config.top_node).trigger("preload_progress", [displayed_perc, finished_count, total_count]);
          if(config.show_text){
            $(config.html.text_node).html(config.loading_text.replace(config.html.insersion, displayed_perc));
          }

          if(displayed_count < finished_count){
            animated = true;
            displayed_count += 1;
            
            $(config.html.indicator).stop();
            $(config.html.indicator).animate({width: (displayed_count / total_count)*100 + "%"}, config.speed, function(){
              animated = false;
            });
          }
        }
      },
      config.interval);
    }else{ // For :nonanimate
      timer = window.setInterval(function(){
        if(displayed_perc >= 100){
          /* 読み込み終わり */
          window.clearInterval(timer);
          $prelude.replace_objects_to_appear(objects);

          if(config.auto_hide){
              $(config.html.wrapper).fadeOut(config.hide_speed, function(){
                $(config.top_node).trigger("preloaded");
              });
            }else{
              $(config.top_node).trigger("preloaded");
            }
        }else{
          if (displayed_perc < now_perc){
            displayed_perc += 1;
            if(config.show_text){
              $(config.html.text_node).html(config.loading_text.replace(":percent", displayed_perc));
            }
            $(config.html.indicator).css("width", displayed_perc + "%");

            $(config.top_node).trigger("preload_progress", [displayed_perc, finished_count, total_count]);
          }
        }
      },
      config.animation.interval);
    }
  }
})(jQuery);