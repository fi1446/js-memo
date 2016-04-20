'use strict';

//操作：セーブ
$('#btn-save').click(function () {
    memo.save();
});

//操作：アップデート
$('#btn-update').on('click', function () {
    memo.update();
});

//操作：お気に入り登録
$('#btn-fav').click(function () {
    var fav = $('#btn-fav').attr('class');
    if (!fav) {
        $('#btn-fav').attr('class', 'fav');
    } else {
        $('#btn-fav').removeClass('fav');
    }
    memo.fav();
});

//操作：削除
$('#btn-delete').click(function () {
    memo.trash();
});

//操作：お気に入りのみ表示、全体表示のトグル
$('#btn-favlist').click(function () {
    $('#list').toggle();
    $('#list-fav').toggle();
});

//操作：一覧から編集したいメモを選ぶ ※documentを指定しないと動的に生成されたDOMを選択できない
$(document).on('click', '#list li, #list-fav li', function () {
    var _idx = $(this).attr('class');
    memo.getData(_idx);
});