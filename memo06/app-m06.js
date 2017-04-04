var Memo = (function () {

    'use strict';

    function Memo() {}

    //メモ初期化時の参照情報（defaults）
    Memo.prototype.firstMemo = function () {
        var memo1 = {};
        memo1.idx = 1;
        memo1.title = '最初のメモ';
        memo1.text = 'これが最初のメモです。';
        memo1.fav = undefined;
        memo1.date = new Date();
        return memo1;
    };

    //メモの初期化処理
    Memo.prototype.init = function () {
        var that = this,
            bigData = localStorage.bigData;
        that.setEditor();
        if (bigData === undefined || bigData === null) {
            var initData = {},
                idx = 'memo1';
            initData[idx] = that.firstMemo();
            pushData(initData);
        }
        that.view();
        that.viewFav();
    };

    //iframeをメモ化させる
    Memo.prototype.setEditor = function () {
        editor.designMode = 'On';
    };

    //メモ帳をまっさらにする時の処理
    Memo.prototype.emptyTexts = function () {
        $('#title').val('');
        $('#editor').contents().find('body').html('');
        $('#btn-fav').removeClass('fav');
    };

    //メモの新規登録機能時の処理
    Memo.prototype.save = function () {
        var that = this;
        saveNewData(setTitle(), setText());
        that.emptyTexts();
        that.view();
    };

    //メモの途中セーブ機能の処理
    Memo.prototype.update = function () {
        var that = this,
            text = setText(),
            title = $('#title').val(),
            idx = $('#editor').attr('class'),
            fav = $('#btn-fav').attr('class');
        if (text !== '' || text !== undefined) {
            updateData(title, text, idx, fav);
        } else {
            return;
        }
        that.view();
        that.viewFav();
    };

    //お気に入りボタンを押した時の処理
    Memo.prototype.fav = function () {
        var that = this,
            data = pullData(),
            idx = $('#editor').attr('class'),
            title = data[idx].title,
            text = data[idx].text,
            fav = $('#btn-fav').attr('class');
        if (text !== '' || text !== undefined) {
            updateData(title, text, idx, fav);
        } else {
            return;
        }
        that.viewFav();
    };

    //メモ削除時の処理
    Memo.prototype.trash = function () {
        var that = this,
            idx = $('#editor').attr('class');
        deleteData(idx);
        that.emptyTexts();
        that.view();
        that.viewFav();
    };

    //リストからメモの情報を引っ張ってくる機能の処理
    Memo.prototype.getData = function (n) {
        var idx = n,
            data = retrieveData(idx),
            editor = $('#editor').contents().find('body');
        editor.html(data.text);
        if (data.fav === 'fav') {
            $('#btn-fav').attr('class', data.fav);
        } else if (!data.fav) {
            $('#btn-fav').removeClass('fav');
        }
        $('#title').val(data.title);
        $('#editor').attr('class', idx);
    };

    //View機能の処理
    Memo.prototype.view = function () {
        var data = pullData(),
            text = '';
        $('#list').children().remove();
        for (var memo in data) {
            var title = data[memo].title,
                date = data[memo].date;
            if (data[memo].idx === null) {
                continue;
            } else {
                text += '<li class=' + memo + '>' + title + '<span class="date">' + date + '</span></li>';
            }
        }
        $('#list').append(text);
    };

    //View機能のお気に入りのみの表示処理
    Memo.prototype.viewFav = function () {
        var data = pullData(),
            text = '';
        $('#list-fav').children().remove();
        for (var memo in data) {
            if (data[memo].idx === null) {
                continue;
            } else if (data[memo].fav === 'fav') {
                var title = data[memo].title,
                    date = data[memo].date;
                text += '<li class=' + memo + '>' + title + '<span class="date">' + date + '</span></li>';
            } else {
                continue;
            }
        }
        $('#list-fav').append(text);
    };

    return Memo;

})();

//オブジェクト生成、初期化
var memo = new Memo();
memo.init();
