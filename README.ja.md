# jQuery Prelude

jQuery Prelude はシンプルなプリローダープラグインです。

# 必須環境

* jQuery 1.7.2+

# 特徴

* セットアップにはちょっとしたJSコードを書く必要がありますが、長たらしいHTMLコードを書く必要はありません！
* CSS background-imageの指定されているHTMLタグを修正するだけで既存のプロジェクトに完全に対応します。

# 使い方

`jquery.prelude-1.7.js`をあなたのプロジェクトに追加します(例えば、`javascripts/`)。  
`jquery.prelude.css`をプロジェクトに追加します(例えば、`stylesheets/`)。そして好きなように編集しましょう！  

>もし、Coffee+SASS環境で作業している場合は、それぞれ  
 `lib/jquery.prelude-1.7.coffee`と`lib/jquery.prelude.scss`  
  を代わりに使用してください。

以下のHTMLタグとJSコードを&lt;head&gt;タグ内に記述してください(もちろんjQueryをロードしてから:)。

	<link rel="stylesheet" type="text/css" href="/path/to/jquery.prelude.css" media="all"/>
	<script type="text/javascript" src="/path/to/jquery.prelude-1.7.js"></script>
	<script type="text/javascript">
	$(function(){
	  $("body").prelude();
	  $("body").on("preloaded", function(){
	    // やったー！preloadedイベントが呼ばれたということはjQuery Preludeが全てのリソースをプリロードしたということです！
	  });
	});
	</script>

これで一番シンプルなセットアップが完了しました！
他のサンプルは`example/`に入っています。良かったら見てみてください！

### CSS background-imageをプリロードするには

jQuery Preludeは特別なこと無しに以下のようなタグはプリロードしてくれます。
(もし勝手に追加されたくなかったらオプションで`smart_prelude: false`とセットしよう)

	<img src="hoge" />
	<audio src="hoge" />

しかし外部ファイルにも分散することのあるCSS background-image属性はそうはいきません。例えば、

	/* CSS */
	#pic {
	  background: url(images/pic1.jpg) 0 0 no-repeat;
	}

	/* HTML */
	<div id="pic"></div>

というコードをjQuery Preludeに拾ってもらうには

	/* CSS */
	#pic {
	  background: url(images/pic1.jpg) 0 0 no-repeat;
	  /* background: 0 0 no-repeat; でもいいよ */
	}

	/* HTML */
	<div id="pic" data-preload="images/pic1.jpg"></div>

と書き換えなくてはなりません。逆に言えば、それさえ置き換えれば他は何も弄らなくて良いということです！

## オプション

`$(element).prelude()`の引数で指定出来るオプションは以下の通りです。
オプションが設定されなかった場合は自動的にこの設定で初期化されます。

    smart_preload: true, /* <img>と<audio>を探して自動的にプリロード対象に追加します。 */
    auto_add_source: true, /* プリロードし終わった要素にsrcやbackground-imageを動的に付加します。 */
    auto_prepare_assets: true, /* 自動的にプリローダのためのHTMLコードが用意されます。 */
    auto_hide: true, /* プリロード完了後にWrapperがフェードアウトします。 */
    hide_speed: 1000, /* Wrapperがフェードアウトに要する時間(秒)です。 */
    show_text: true, /* ローディングテキストを表示します。 */
    loading_text: ":percent %", /* :percentは進行の割合に置き換えられます。 */
    animation: {
      interval: 20, /* タイマーの更新頻度。滑らかさを調整出来ます（推奨：20） */
      speed: 1000 /* アニメーションスピード(ミリ秒) */
    }

## イベントハンドラ

### on preloaded

プリロードが完了したときに呼び出されます。自動的にロード画面はフェードアウトするので、このタイミングでコンテンツを視覚化することをお勧めします。
(自動的にフェードアウトさせなく無いですか？オプションで`auto_hide: false`とセットしましょう)

	$("body").on("preloaded", function(event){
      $("#container").css("display", "block");
      $("#container").animate({opacity: 1}, 800);
      $("#player").trigger("play");
    });

### on preload_progress

進捗が変化した際に呼ばれます。カスタムアニメーションを定義したい場合に使うと良いでしょう。

	$("body").on("preload_progress", function(event, percent, finished_count, total_count){
	  /* percent => 現在の進捗
	   * finished_count => ロードが完了したリソースの数
	   * total_count => クエリに入っているリソース数
	   */
	  $("#circle").animate({transform: "rotate("+percent+")"});
	});

# 採用例

* ADAMANT HEART - <http://0050.attri.me/> | Designed by sekka.
* Lost World -ロストワールド- - <http://8lemo.com/products/lost/> | Designed by narugami.
* 水の都のオートマタ - <http://unisonia.jp/01a/> | Designed by sekka.

# 協力

新しい機能の要望/改善があったら私の[Twitter](http://twitter.com/o_ame)にリプライで教えてください。

プルリクエストを歓迎します！

# クレジット

Maintained by o_ame - <http://oameya.com>
Licensed by MIT License

※サンプルピクチャは私が撮りました :)