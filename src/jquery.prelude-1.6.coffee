###
# jQuery Prelude - jQuery Plugin
# Simple preloader plug-in
#
# Examples and document at http://oame.github.com/jquery.prelude
#
# Copyright(C) 2012 o_ame - http://oameya.com
# version: 1.6
# require: jQuery 1.7.2+
# license: MIT License
###

(($) ->
  Array.prototype.remove = (element) -> this.splice(n, 1) if $(i).data("preload") == element for i, n in this

  $prelude =
    collect_objects: (node) ->
      _objects = []
      $("#{node} *").each -> _objects.push this if $(this).data("preload")?
      return _objects
    sniff_tags: (node) ->
      $("#{node} img,audio").each -> $(this).attr "data-preload", $(this).attr("src") if $(this).attr("src")?
    preload_objects: (_objects, callback) ->
      total = _objects.length
      $(_objects).each ->
        src = $(this).data "preload"
        if this.tagName == "AUDIO"
          audio = $("<audio/>").attr("src", src).load()
          audio.on "canplay canplaythrough", ->
            _objects.remove src
            callback(total, total - _objects.length)
        else
          img = $("<img/>").attr src: src
          ua = $.browser
          if ua.msie && img.width() !=0
            _objects.remove src
            callback(total, total - _objects.length)
          else
            img.load ->
              _objects.remove src
              callback(total, total - _objects.length)
    replace_objects_to_appear: (_objects) ->
      $(_objects).each ->
        switch this.tagName
          when "IMG"
            $(this).attr src: $(this).data "preload"
          when "AUDIO"
            $(this).attr src: $(this).data "preload"
          else
            $(this).css "background-image": "url( #{$(this).data("preload")} )"
    auto_assets: (node) ->
      wrapper = $("<div/>").attr "id", "prelude-wrapper"
      slider = $("<div/>").attr "id", "prelude-slider"
      slider.append $("<span/>")
      if config.show_text
        text_layer = $("<div/>").attr id: "prelude-text-layer"
        text_layer.append $("<p/>").attr "id", "prelude-text"
        wrapper.append text_layer
      wrapper.append slider
      $(node).prepend wrapper
    stat_log: (tag) ->
      console.log "[#{tag}] displayed_count: #{displayed_count} finished_count: #{finished_count} total_count: #{total_count} now_perc: #{now_perc} displayed_perc: #{displayed_perc}"

  timer = null
  objects = []
  now_perc = 0
  displayed_perc = 0
  total_count = 0
  finished_count = 0
  displayed_count = 0

  # Default configuration
  config =
    animate: true
    smart_prelude: true
    auto_assets: true
    auto_hide: true
    hide_speed: 1000
    show_text: true
    loading_text: ":percent %"
    animation: # For :animate
      interval: 20
      speed: 1000

  $.fn.prelude = (options) ->
    # Configure options
    options = {} if options?
    config = jQuery.extend(config, options)
    config.top_node = $(this).selector
    config.html = {}
    config.html.wrapper = "#{config.top_node} > #prelude-wrapper"
    config.html.slider = "#{config.html.wrapper} > #prelude-slider"
    config.html.indicator = "#{config.html.slider} > span"
    config.html.text_node = "#{config.html.wrapper} > #prelude-text-layer > #prelude-text"
    config.html.insersion = ":percent"

    $prelude.sniff_tags(config.top_node) if config.smart_prelude?
    $prelude.auto_assets(config.top_node) if config.auto_assets?

    objects = $prelude.collect_objects config.top_node
    total_count = objects.length
    $prelude.preload_objects $.extend(true, [], objects), (_total, _loaded) ->
      # Called when finished loading object
      now_perc = Math.ceil(100 * _loaded / _total)
      finished_count += 1

    if config.animate # For animate
      animated = true
      timer = window.setInterval ->
        if total_count <= displayed_count && animated == false
          # 読み込み終わり
          window.clearInterval timer
          $prelude.replace_objects_to_appear objects

          if config.auto_hide
            $(config.html.wrapper).fadeOut config.hide_speed, -> $(config.top_node).trigger "preloaded"
          else
            $(config.top_node).trigger "preloaded"
        else
          top_x = parseInt $(config.html.slider).css "width"
          now_x = parseInt $(config.html.indicator).css "width"
          displayed_perc = Math.ceil(now_x / top_x * 100)
          $(config.top_node).trigger "preload_progress", [displayed_perc, finished_count, total_count]
          $(config.html.text_node).html(config.loading_text.replace(config.html.insersion, displayed_perc)) if config.show_text?

          if displayed_count < finished_count
            animated = true
            displayed_count += 1
            
            $(config.html.indicator).stop()
            $(config.html.indicator).animate {width: (displayed_count / total_count)*100 + "%"}, config.speed, -> animated = false
      , config.interval
    else # For :nonanimate
      timer = window.setInterval ->
        if displayed_perc >= 100
          # 読み込み終わり
          window.clearInterval timer
          $prelude.replace_objects_to_appear objects

          if config.auto_hide
            $(config.html.wrapper).fadeOut config.hide_speed, -> $(config.top_node).trigger "preloaded"
          else
            $(config.top_node).trigger "preloaded"
        else
          if displayed_perc < now_perc
            displayed_perc += 1
            
            $(config.html.text_node).html(config.loading_text.replace(":percent", displayed_perc)) if config.show_text?
            $(config.html.indicator).css width: "#{displayed_perc} %"
            $(config.top_node).trigger "preload_progress", [displayed_perc, finished_count, total_count]
      , config.animation.interval
)(jQuery)