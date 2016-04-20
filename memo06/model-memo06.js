'use strict';

//唯一、例外的にエディターの定義だけグローバル変数で扱う
var editor = document.getElementsByTagName("iframe")[0].contentDocument;

//基本的なHTML要素をしまう名前空間
var elSet = {
    $save: $('#btn-save'),
    $update: $('#btn-update'),
    $delete: $('#btn-delete'),
    $editor: $('#editor'),
    $title: $(':text[name="title"]'),
    $fav: $('#btn-fav'),
    $list: $('#list'),
    $favList: $('#list-fav'),
    $favBtn: $('#btn-favlist')
};