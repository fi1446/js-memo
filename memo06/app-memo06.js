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
        var _that = this,
            bigData = localStorage.bigData;
        _that.setEditor();
        if (bigData === undefined || bigData === null) {
            var initData = {},
                _idx = 'memo1';
            initData[_idx] = _that.firstMemo();
            pushData(initData);
        }
        _that.view();
        _that.viewFav();
    };

    //iframeをメモ化させる
    Memo.prototype.setEditor = function () {
        editor.designMode = 'On';
    };

    //メモ帳をまっさらにする時の処理
    Memo.prototype.emptyTexts = function () {
        elSet.$title.val('');
        elSet.$editor.contents().find('body').html('');
        elSet.$fav.removeClass('fav');
    };

    //メモの新規登録機能時の処理
    Memo.prototype.save = function () {
        var _that = this;
        saveNewData(setTitle(), setText());
        _that.emptyTexts();
        _that.view();
    };

    //メモの途中セーブ機能の処理
    Memo.prototype.update = function () {
        var _that = this,
            _text = setText(),
            _title = elSet.$title.val(),
            _idx = elSet.$editor.attr('class'),
            _fav = elSet.$fav.attr('class');
        if (_text !== '' || _text !== undefined) {
            updateData(_title, _text, _idx, _fav);
        } else {
            return;
        }
        _that.view();
        _that.viewFav();
    };

    //お気に入りボタンを押した時の処理
    Memo.prototype.fav = function () {
        var _that = this,
            data = pullData(),
            _idx = elSet.$editor.attr('class'),
            _title = data[_idx].title,
            _text = data[_idx].text,
            _fav = elSet.$fav.attr('class');
        if (_text !== '' || _text !== undefined) {
            updateData(_title, _text, _idx, _fav);
        } else {
            return;
        }
        _that.viewFav();
    };

    //メモ削除時の処理
    Memo.prototype.trash = function () {
        var _that = this,
            _idx = elSet.$editor.attr('class');
        deleteData(_idx);
        _that.emptyTexts();
        _that.view();
        _that.viewFav();
    };

    //リストからメモの情報を引っ張ってくる機能の処理
    Memo.prototype.getData = function (n) {
        var _idx = n,
            _data = retrieveData(_idx),
            $editor = elSet.$editor.contents().find('body');
        $editor.html(_data.text);
        if (_data.fav === 'fav') {
            elSet.$fav.attr('class', _data.fav);
        } else if (!_data.fav) {
            elSet.$fav.removeClass('fav');
        }
        elSet.$title.val(_data.title);
        elSet.$editor.attr('class', _idx);
    };

    //View機能の処理
    Memo.prototype.view = function () {
        var data = pullData(),
            _text = '';
        elSet.$list.children().remove();
        for (var memo in data) {
            var date = data[memo].date;
            if (data[memo].idx === null) {
                continue;
            } else {
                _text += '<li class=' + memo + '>' + data[memo].title + '<span class="date">' + date + '</span></li>';
            }
        }
        elSet.$list.append(_text);
    };

    //View機能のお気に入りのみの表示処理
    Memo.prototype.viewFav = function () {
        var data = pullData(),
            _text = '';
        elSet.$favList.children().remove();
        for (var memo in data) {
            if (data[memo].idx === null) {
                continue;
            } else if (data[memo].fav === 'fav') {
                var date = data[memo].date;
                _text += '<li class=' + memo + '>' + data[memo].title + '<span class="date">' + date + '</span></li>';
            } else {
                continue;
            }
        }
        elSet.$favList.append(_text);
    };

    return Memo;

})();

//オブジェクト生成、初期化
var memo = new Memo();
memo.init();