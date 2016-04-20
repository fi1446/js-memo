/*jslint nomen: true*/
'use strict';

//メモの作成機能
function createMemo(title, text) {
    var newObj = {};
    newObj.idx = Object.keys(pullData()).length + 1;
    newObj.title = title;
    newObj.text = text;
    newObj.fav = undefined;
    newObj.date = new Date();
    return newObj;
}

//メモの更新機能
function pushData(tmpData) {
    localStorage.setItem('bigData', JSON.stringify(tmpData));
}

//メモの全データを一時的に引っ張ってくる機能
function pullData() {
    var savedData = (function () {
        return JSON.parse(localStorage.getItem('bigData'));
    }());
    return savedData;
}

//メモのセーブ機能（新規追加）
function saveNewData(title, text) {
    if (text === '' || text === undefined) {
        return;
    }
    title = title || '無題のメモ';
    var bigData = pullData(),
        _data = new createMemo(title, text),
        _idx = 'memo' + _data.idx;
    bigData[_idx] = _data;
    pushData(bigData);
}

//メモの更新機能
function updateData(title, text, idx, fav) {
    title = title || '無題のメモ';
    if (text === '' || text === undefined) {
        return;
    } else if (idx === undefined) {
        return;
    } else {
        var bigData = pullData(),
            _fav;
        bigData[idx].title = title;
        bigData[idx].text = text;
        if (fav === 'fav') {
            _fav = fav;
        } else {
            _fav = undefined;
        }
        bigData[idx].fav = _fav;
        pushData(bigData);
    }
}

function deleteData(idx) {
    if (idx === undefined || idx === null) {
        return;
    } else {
        var bigData = pullData();
        if (window.confirm('本当にメモを削除してもよろしいですか？\n削除すると、このメモは二度と編集できません。')) {
            bigData[idx].idx = null;
        }
        pushData(bigData);
    }
}

//テキストのセット ※関数なのは初期状態を変数にしまわぬように動的に取得するため
function setText() {
    var text = elSet.$editor.contents().find('body').html();
    return text;
}

//タイトルのセット ※関数なのは初期状態を変数にしまわぬように動的に取得するため
function setTitle() {
    var title = elSet.$title.val();
    return title;
}

//メモの部分的抽出
function retrieveData(n) {
    var datalist = pullData(),
        data = datalist[n];
    return data;
}