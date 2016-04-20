'use strict';

//操作：セーブ
elSet.$save.click(function () {
    memo.save();
});

//操作：アップデート
elSet.$update.on('click', function () {
    memo.update();
});

//操作：お気に入り登録
elSet.$fav.click(function () {
    var $fav = elSet.$fav.attr('class');
    if (!$fav) {
        elSet.$fav.attr('class', 'fav');
    } else {
        elSet.$fav.removeClass('fav');
    }
    memo.fav();
});

//操作：削除
elSet.$delete.click(function () {
    memo.trash();
});

//操作：お気に入りのみ表示、全体表示のトグル
elSet.$favBtn.click(function () {
    elSet.$list.toggle();
    elSet.$favList.toggle();
});

//操作：一覧から編集したいメモを選ぶ ※documentを指定しないと動的に生成されたDOMを選択できない
$(document).on('click', '#list li, #list-fav li', function () {
    var _idx = $(this).attr('class');
    memo.getData(_idx);
});