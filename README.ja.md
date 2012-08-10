# jquery.naz

jquery.naz はシンプルなプリローダープラグインです。  
Webデザイナーがデザインだけに集中出来るよう設計されています。

# 必須環境

* jQuery 1.7.2+

# 特徴

* セットアップにはちょっとしたJSコードを書く必要がありますが、長たらしいHTMLコードを書く必要はありません！
* CSS background-imageの指定されているHTMLタグを修正するだけで既存のプロジェクトに完全に対応します。

# 使い方

`jquery.naz-1.3.js`をあなたのプロジェクトに追加します(例えば、`javascripts/`)。  
小さいサイズがお好みでしたら`jquery.naz-1.3.min.js`を代わりに追加します。

`jquery.naz.css`をプロジェクトに追加します(例えば、`stylesheets/`)。そして好きなように編集しましょう！

以下のHTMLタグとJSコードを&lt;head&gt;タグ内に記述してください(もちろんjQueryをロードしてから:)。

	<link rel="stylesheet" type="text/css" href="/path/to/jquery.naz.css" media="all"/>
	<script type="text/javascript" src="/path/to/jquery.naz-1.3.js"></script>
	<script type="text/javascript">
	$(function(){
	  $("body").naz();
	  $("body").on("naz_preloaded", function(){
	    // やったー！naz_preloadedイベントが呼ばれたということはNazが全てのリソースをプリロードしたということです！
	  });
	});
	</script>

これで一番シンプルなセットアップが完了しました！
他のサンプルは`example/`に入っています。良かったら見てみてください！

### CSS background-imageをプリロードするには

Nazは特別なこと無しに以下のようなタグはプリロードしてくれます。  
(もし勝手に追加されたくなかったらオプションで`smart_naz: false`とセットしよう)

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
    smart_naz: true, /* <img>と<audio>を探して自動的にプリロード対象に追加します。 */
    auto_assets: true, /* 自動的にプリローダのためのHTMLコードが用意されます。 */
    auto_hide: true, /* プリロード完了後にWrapperがフェードアウトします。 */
    hide_speed: 1000, /* Wrapperがフェードアウトに要する時間(秒)です。 */
    show_text: true, /* ローディングテキストを表示します。 */
    loading_text: ":percent %", /* :percentは進行の割合に置き換えられます。 */
    animation: {
      interval: 20, /* タイマーの更新頻度。滑らかさを調整出来ます（推奨：20） */
      speed: 1000 /* アニメーションスピード(ミリ秒) */
    }

## イベントハンドラ

### on naz_preloaded

プリロードが完了したときに呼び出されます。自動的にロード画面はフェードアウトするので、このタイミングでコンテンツを視覚化することをお勧めします。  
(自動的にフェードアウトさせなく無いですか？オプションで`auto_hide: false`とセットしましょう)

	$("body").on("naz_preloaded", function(event){
      $("#container").css("display", "block");
      $("#container").animate({opacity: 1}, 800);
      $("#player").trigger("play");
    });

### on naz_progress

進捗が変化した際に呼ばれます。カスタムアニメーションを定義したい場合に使うと良いでしょう。

	$("body").on("naz_progress", function(event, percent, finished_count, total_count){
	  /* percent => 現在の進捗
	   * finished_count => ロードが完了したリソースの数
	   * total_count => クエリに入っているリソース数
	   */
	  $("#circle").animate({transform: "rotate("+percent+")"});
	});

# 採用例

* ADAMANT HEART - <http://0050.attri.me/> | Designed by sekka.
* Lost World -ロストワールド- - http://8lemo.com/products/lost/ | Designed by narugami.

# 協力

新しい機能の要望/改善があったら私の[Twitter](http://twitter.com/o_ame)にリプライで教えてください。  
もしくは匿名で[意見ボックス](http://tracht.ameapp.com/w/5)に書き込んでみてください。  
必ず採用するとは限りませんが最大限考慮させて頂きます。

プルリクエストを歓迎します！

# クレジット

Maintained by oame - <http://oameya.com>  
Licensed by MIT License

※サンプルピクチャは私が撮りました :)