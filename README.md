# jquery.naz

Simple preloader.

# 必須環境

* jQuery 1.7.2+

# 特徴

* ちょっとしたJSコードを書くだけで準備完了です。長たらしいHTMLコードを書く必要はありません！
* img, audioタグを自動的に探してくれるので、CSS background-imageの場合だけHTMLタグを修正するだけで既存のプロジェクトに完全に対応します。

# 使い方

1. `jquery.naz-1.1.js`をあなたのプロジェクトに追加します(例えば、`javascripts/`)。  
小さいサイズがお好みでしたら`jquery.naz-1.1.min.js`を代わりに追加します。
2. `jquery.naz.css`をプロジェクトに追加します(例えば、`stylesheets/`)。そして好きなように編集しましょう！
3. 以下のHTMLタグとJSコードを&lt;header&gt;タグ内に記述してください(もちろんjQueryはロードしてから:o)。

        <link rel="stylesheet" type="text/css" href="/path/to/jquery.naz.css" media="all"/>
  	    <script type="text/javascript" src="/path/to/jquery.naz-1.1.js"></script>
  	    <script type="text/javascript">
  	    $(function(){
          $("body").naz();
    	  $("body").on("naz_preloaded", function(){
      	    // やったー！naz_preloadedイベントが呼ばれたということはNazが全てのリソースをプリロードしたということです！
          });
   	    });
  	    </script>

4. これで終わり！お疲れ様です！  
サンプルは`example/`に入っています。良かったら見てみて！

### CSS background-imageをプリロードするには

Nazは特別なことをしなくても以下のようなタグは自動的に探してプリロードクエリに追加してくれます。

	<img src="hoge" />
	<audio src="hoge" />

しかし外部ファイルにも分散することのあるCSS background-image属性はそうはいきません。例えば、  

	/* CSS */
	#pic {
	  background: url(images/pic1.jpg) 0 0 no-repeat;
	}
	
	/* HTML */
	<div id="pic"></div>

というコードをNazに拾ってもらうには

	/* CSS */
	#pic {
	  background: url(images/pic1.jpg) 0 0 no-repeat;
	  /* background: 0 0 no-repeat; でもいいよ */
	}
	
	/* HTML */
	<div id="pic" data-naz-src="images/pic1.jpg"></div>

と書き換えなくてはなりません。逆に言えば、それさえ置き換えれば他は何も弄らなくて良いということです！

## オプション

`$("body").naz()`の引数で指定出来るオプションは以下の通りです。
オプションが設定されなかった場合は自動的にこの設定で初期化されます。
    
    animate: false, /* true => .animateを使います, false => 使いません */
    interval: 20, /* タイマーの更新頻度。特に弄る必要はなし */
    smart_naz: true, /* <img>と<audio>を探して自動的にプリロード対象に追加します。 */
    auto_assets: true, /* 自動的にプリローダのためのHTMLコードが用意されます。 */
    auto_hide: true, /* プリロード完了後にWrapperがフェードアウトします。 */
    show_text: true, /* ローディングテキストを表示します。 */
    loadingText: ":percent %", /* :percentは進行の割合に置き換えられます。 */
    animation: { // :animate用
      speed: 1000 /* アニメーションスピード(ミリ秒) */
    }

## イベントハンドラ

### on:naz_preloaded

プリロードが全て完了した時に呼ばれます。プリロード完了時にLoading画面は自動でフェードアウトするので、このタイミングでコンテンツを可視化すると良いでしょう。

	$("body").on("naz_preloaded", function(){
      $("#container").css("display", "block");
      $("#container").animate({opacity: 1}, 800);
      $("#player").trigger("play");
    });

### on:naz_progress

進捗が変化した際に呼ばれます。カスタムアニメーションを定義したい場合に使うと良いでしょう。

	$("body").on("naz_progress", function(now_percent){
	  $("#circle").animate({transform: "rotate("+now_percent+")"});
	});

# 協力

新しい機能の要望/改善があったら私の[Twitter](http://twitter.com/o_ame)にリプライで教えてください。  
もしくは匿名で[意見ボックス](http://tracht.ameapp.com/w/5)に書き込んでみてください。  
必ず採用するとは限りませんが最大限考慮させて頂きます。

プルリクエストを歓迎します！

# クレジット

Maintained by oame - http://oameya.com  
Licensed by MIT License

※サンプルピクチャは私が撮りました :)