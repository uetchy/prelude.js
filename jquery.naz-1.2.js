/*
 * jquery.naz - jQuery Plugin
 * Simple preloader
 *
 * Examples and document at http://oame.github.com/jquery.naz
 *
 * Copyright(C) 2012 oame - http://oameya.com
 * version: 1.2
 * require: jQuery 1.7.2+
 * license: MIT License
 */

(function($, undefined){
  Array.prototype.remove = function(element){
    for (var i = 0; i < this.length; i++){
      if($(this[i]).data("naz-src") == element)this.splice(i, 1);
    }
  };

  $naz = {
    collect_objects: function(node){
      var _objects = [];
      $(node + " *").each(function(){
        if(typeof $(this).data("naz-src") !== "undefined"){
          _objects.push(this);
        }
      });
      return _objects;
    },
    sniff_tags: function(node){
      $(node + " img,audio").each(function(){
        if(typeof $(this).data("naz-src") !== "undefined"){

        }else if(typeof $(this).attr("src") !== "undefined"){
          $(this).attr("data-naz-src", $(this).attr("src"));
        }
      });
    },
    preload_objects: function(_objects, callback) {
      var total = _objects.length;
      $(_objects).each(function(){
        var src = $(this).data("naz-src");
        if(this.tagName == "AUDIO"){
          var audio = $("<audio/>").attr("src", src).load();
          audio.on('canplay canplaythrough', function(){
            _objects.remove(src);
            callback(total, total - _objects.length);
          });
        }else{
          $("<img/>").attr("src", src).load(function(){
            _objects.remove(src);
            callback(total, total - _objects.length);
          });
        }
      });
    },
    replace_objects_to_appear: function(_objects){
      $(_objects).each(function(){
        switch(this.tagName){
          case "IMG":
          $(this).attr("src", $(this).data("naz-src"));
          break;
          case "AUDIO":
          $(this).attr("src", $(this).data("naz-src"));
          break;
          default:
          $(this).css("background-image", "url("+$(this).data("naz-src")+")");
        }
      });
    },
    auto_assets: function(node){
      var wrapper = $("<div/>").attr("id", "naz-wrapper");
      var slider = $("<div/>").attr("id", "naz-slider");
      slider.append($("<span/>"));
      if(config.show_text){
        var text_layer = $("<div/>").attr("id", "naz-text-layer");
        text_layer.append($("<p/>").attr("id", "naz-text"));
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
    animate: false,
    interval: 20,
    smart_naz: true,
    auto_assets: true,
    auto_hide: true,
    show_text: true,
    loading_text: ":percent %",
    animation: { // For :animate
      speed: 1000
    }
  };

  $.fn.naz = function(options){
    /* Configure options */
    if(typeof options === "undefined")options = {};
    config = jQuery.extend(config, options);
    config.top_node = $(this).selector;
    config.html = {};
    config.html.wrapper = config.top_node + " > #naz-wrapper";
    config.html.indicator = config.html.wrapper + " > #naz-slider > span";
    config.html.text_node = config.html.wrapper + " > #naz-text-layer > #naz-text";
    config.html.insersion = ":percent";

    if(config.smart_naz)$naz.sniff_tags(config.top_node);
    if(config.auto_assets)$naz.auto_assets(config.top_node);

    objects = $naz.collect_objects(config.top_node);
    total_count = objects.length;
    $naz.preload_objects($.extend(true, [], objects), function(_total, _loaded){
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
          $naz.replace_objects_to_appear(objects);

          if(config.auto_hide){
              $(config.html.wrapper).fadeOut("slow", function(){
                $(config.top_node).trigger("naz_preloaded");
              });
            }else{
              $(config.top_node).trigger("naz_preloaded");
            }
        }else{
          if(displayed_count < finished_count){
            animated = true;
            displayed_perc = now_perc;
            displayed_count += 1;
            if(config.show_text){
              $(config.html.text_node).html(config.loading_text.replace(config.html.insersion, displayed_perc));
            }
            $(config.html.indicator).stop();
            $(config.html.indicator).animate({width: (displayed_count / total_count)*100 + "%"}, config.speed, function(){
              animated = false;
            });

            $(config.top_node).trigger("naz_progress", [displayed_perc, finished_count, total_count]);
          }
        }
      },
      config.interval);
    }else{ // For :nonanimate
      timer = window.setInterval(function(){
        if(displayed_perc >= 100){
          /* 読み込み終わり */
          window.clearInterval(timer);
          $naz.replace_objects_to_appear(objects);

          if(config.auto_hide){
              $(config.html.wrapper).fadeOut("slow", function(){
                $(config.top_node).trigger("naz_preloaded");
              });
            }else{
              $(config.top_node).trigger("naz_preloaded");
            }
        }else{
          if (displayed_perc < now_perc){
            displayed_perc += 1;
            if(config.show_text){
              $(config.html.text_node).html(config.loading_text.replace(":percent", displayed_perc));
            }
            $(config.html.indicator).css("width", displayed_perc + "%");

            $(config.top_node).trigger("naz_progress", [displayed_perc, finished_count, total_count]);
          }
        }
      },
      config.interval);
    }
  }
})(jQuery);