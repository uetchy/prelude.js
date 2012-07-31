# jquery.naz

ちょっとしたPreloader

## 必須環境

* jQuery 1.7.2+

## 特徴

* ちょっとしたJSコードを書くだけで準備完了です。長たらしいHTMLコードを書く必要はありません！
* img, audioタグを自動的に探してくれるので、CSS Backgroundの場合だけHTMLタグを修正するだけで既存のプロジェクトに完全に対応します。


## 使い方

1. `jquery.naz-1.0.js`をあなたのプロジェクトに追加します(例えば、`javascripts/`)。  
小さいサイズがお好みでしたら`jquery.naz-1.0.min.js`を代わりに追加します。
2. `jquery.naz.css`をプロジェクトに追加します(例えば、`stylesheets/`)。そして好きなように編集しましょう！
3. 以下のHTMLタグとJSコードを&lt;header&gt;タグ内に記述してください(もちろんjQueryはロードしてから:o)。

 		<link rel="stylesheet" type="text/css" href="/path/to/jquery.naz.css" media="all"/>
  		<script type="text/javascript" src="/path/to/jquery.naz-1.0.js"></script>
  		<script type="text/javascript">
  		$(function(){
    	  $("body").naz({
      	    animate: false, /* true => .animateを使います, false => 使いません */
      		smart_naz: true, /* <img>と<audio>を探して自動的にプリロード対象に追加します。 */
      		auto_assets: true /* 自動的にプリローダのためのHTMLコードが用意されます。 */
      		interval: 20,
    		animation: { // :animate用
      		  speed: 1000, /* アニメーションスピード(ミリ秒) */
      		  loadingText: "Loading..."
   			},
    		nonanimate: { // :animateしない用
      		  loadingText: ":percent %" /* :percentは進行の割合に置き換えられます。 */
    		}
    	  });

    	  $("body").bind("preloaded", function(){
      	    // やったー！preloadedイベントが呼ばれたということはNazが全てのリソースをプリロードしたということです！
    	  });
   	  	});
  		</script>

 4. これで終わり！お疲れ様です！  
 サンプルは`example/`に入っています。良かったら見てみて
 
### ヒント

### CSS Backgroundイメージをプリロードするには

	<img src="hoge" />
	<audio src="hoge" />

上記のタグは特別なことをしなくてもNazが自動的に探してくれますがCSSのbackground属性はそうはいきません。  
例えば、

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

と書き換えなくてはなりません。

#### デフォルト設定
`$("body").naz()`の引数でオプションを指定しなくても自動的に以下の設定で初期化されます。

  	config = {
      animate: false,
      interval: 20,
      smart_naz: true,
      auto_assets: true,
      animation: { // :animate用
        speed: 1000,
        loadingText: "Loading..."
      },
      nonanimate: { // :animateしない用
        loadingText: ":percent %"
      }
    }

## 協力

新しい機能の要望/改善があったら私の[Twitter](http://twitter.com/o_ame)にリプライで教えてください。  
もしくは匿名で[意見ボックス](http://tracht.ameapp.com/w/5)に書き込んでみてください。  
必ず採用するとは限らないけど最大限考慮します。

## クレジット

Maintained by oame - http://oameya.com  
Licensed by MIT License

※サンプルピクチャは私が撮りました :)