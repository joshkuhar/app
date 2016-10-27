'use strict';

//model
var cachedItems = [];
var List = {};
var averageTwentyReturn = 4.42;
var existingList = false;
var clearModels = function(){
    cachedItems.length = 0;
    List = {};
    existingList = false;
};
//controller
var createItem = function(item, price){
    return {item: {name: item, price: price}};
};
var calculate = function(price, multiplyer) {
    return price * multiplyer;
};
var cacheItem = function(item){
    cachedItems.push(item);
};
var removeFromCache = function(id){
    for (var x = 0; x < cachedItems.length; x++) {
        if (cachedItems[x]._id == id) {
            deleteFromDB(cachedItems[x]._id);
            cachedItems.splice(x, 1);
        }
    }
};
// ENDPOINTS
// GET endpoint
var getCategory = function(name){
    var ajax = $.ajax('/category/' + name, {
        type: 'GET',
        dataType: 'json',
        // data: data,
        contentType: 'application/json'
    });
    ajax.done(  function  (result)    {
        console.log(result);
        // List.name = result[0].name;
        // displayListName(result[0].name);
        // var eachResult = result[0].items;
        // console.log(eachResult);
        // for (var x = 0; x<eachResult.length; x++){
        //     cachedItems.push( { id: x, items: eachResult[x] });
        //     showSavedListByName(x, eachResult);
        //     idForCachedItems++;
        // }
        // store_id(result[0]._id);
    });
};
// POST ENDPOINTS
var postCategoryName = function(name){
    console.log(JSON.stringify(name));
    var ajax = $.ajax('/category', {
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(name),
        contentType: 'application/json'
    });
    ajax.done(function(result){
        console.log(result);
        cacheItem(result);
        displayCategoryName(result._id, result.name);
    });
}
var postItem = function(id, item){
    console.log(JSON.stringify(item));
    var ajax = $.ajax('/item/'+id, {
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(item),
        // data: JSON.stringify(item),
        contentType: 'application/json'
    });
    ajax.done(function(result){
        console.log("I'm " + result);
        cacheItem(result);
        displayItem(result._id, result.item.name, result.item.price);
    });
}

// PUT endpoint delete item from list
var editItem = function(id, data){
    console.log(id, data);
    var ajax = $.ajax('/b/' + id, {
        type: 'PUT',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json'
    }); 
    ajax.done(function(result){
        console.log(result);

    });
};

// DELETE item from database
var deleteFromDB = function(id){
    var ajax = $.ajax('/item/' + id, {
        type: 'DELETE',
        dataType: 'json'
    });
    ajax.done( function (result) {
        console.log(result);
    });
};

// Listeners
// Calculate item and add to list
$('#add-to-list').click(function(){ 
    var item = $('#item-bought').val();
    var price = parseInt($('#price-paid').val());
    var newPrice = calculate(price, averageTwentyReturn);


    var id = $('.category-name').attr('id');
    postItem(id, createItem(item, newPrice));
    $('#item-bought').val('');
    $('#price-paid').val('');
    $('#item-bought').focus();
    showClearAndUpdate();
    showSaveAndUpdate();
});

// Delete item from  list
$('#item').on('click', '#delete-item', function(){
    var id = $(this).parent().attr('id');
    $(this).parent().remove();
    deleteFromDB(id);
    });
// Save list name
$('#save').click(function(){
    if ($('#listName').val() === ""){
        alert("Please enter a name for your list.");
        return;
    } 
    var categoryName = $('#listName').val();
    postCategoryName({name: categoryName});
    $('#listName').val("");
    // $(this).prop("disabled",true);
});
// Retrieve previous lists with search name
$('#get-history').click(function(){
    if (existingList == true){
        alert("Please clear current list before viewing a new one.")
        return;
    }
    var search = $('#search').val();    
    console.log(search);
    getCategory(search);
    $('#search').val('');
    showClearAndUpdate();
    showSaveAndUpdate();
    existingList = true;
    $('#truevalue').show();
    $('#save').prop("disabled",false);
});
//Save updated list to data base
$('#save-updated-list').click(function(){
    var listId = $('#list-id').text();
    List.items = removeIdFromCachedItems();
    editItem(listId, List);
    List = {};
});
// Clear previous list
$('#clear').click(function(){
    clearViews();
    clearModels();
    $('#save').prop("disabled",false);
    $('#bottom').hide();
    $('#truevalue').hide();
});

// Delete previous lists
$('#remove-list').click(function(){
    var listId = $('#list-id').text();
    deleteFromDB(listId);
    clearViews();   
    clearModels();
    $('#truevalue').hide();
    $('#bottom').hide();
    $('#save').prop("disabled",false);
});


//views
var clearViews = function(){
    $('#remove-list').hide();
    $('#clear').hide();
    $('#item').empty();
    $('#name').empty();
};
var showSavedListByName = function(index, value){
    var listItemOpen = '<li id=' + idForCachedItems + '>';
    var firstSpan = '<span class="first">' + value[index].item + '</span>';
    var secondSpan = '<span class="second">$' + value[index].price + '</span>';
    var deleteBttn = '<input type="submit" value="delete" id="delete-item">';
    var listItemClose = '</li>';

    $('#item').append(listItemOpen + firstSpan + secondSpan + deleteBttn + listItemClose);
};
var store_id = function(id){
    $('#item').append('<span id="list-id">' + id + '</span>');
};
var clearElementAfterPost = function(){
        $('#listName').val('');
        $('#item').empty();
};
var displayItem = function(id, item, price){
    var open = '<li id='+id+'>';
    var firstSpan = '<span class="first">' + item  + '</span>';
    var secondSpan = '<span class="second">$' + price + ' </span>';
    var deleteBttn = '<input type="submit" value="delete" id="delete-item">';
    var listItemClose = '</li>';
    $('#item').append(open + firstSpan + secondSpan + deleteBttn + listItemClose);
    $('#truevalue').show();
};
var displayCategoryName = function(id, name) {
    $('#cat-container').append('<span class="category-name"id="'+id+'">Name: '+name+'</span>');
};
var showClearAndUpdate = function(){
    $('#remove-list').show();
    $('#clear').show();
};
var showSaveAndUpdate = function(){
    $('#bottom').show();
};





    




