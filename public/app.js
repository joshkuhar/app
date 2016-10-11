

var getPage = function(){
    var ajax = $.ajax('/a', {
        type: 'GET',
        dataType: 'json'
    });
    ajax.done(  function  (result)    {
        console.log(result);
        for (var x = 0; x<result.length; x++){
            $('#get').append(result[x]._id + " :" + result[x].pass + "    <br>");
        }
    });
};

var postToDB = function(data){
    var ajax = $.ajax('/b', {
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        contentType: 'application/json'
    });
    console.log('I am ' + data);
    ajax.done(  function  (result)    {
        console.log(result._id);
        // $('#test').append('<br>' + result._id);
        // console.log('I am result' + JSON.stringify(result));
    }); 
};
var deleteFromDB = function(id){
    var ajax = $.ajax('/b/' + id, {
        type: 'DELETE',
        dataType: 'json'
    });
    ajax.done( function (result) {
        console.log(result);
    });
};

var editItem = function(id, pass){
    var item = {
        'pass': pass,
        'id': id
    };
    var ajax = $.ajax('/b/' + id, {
        type: 'PUT',
        data: JSON.stringify(item),
        dataType: 'json',
        contentType: 'application/json'
    });
    ajax.done(function(result){
        console.log(result);
    });
};

// calculates function
var calculate = function(price, multiplyer) {
    return price * multiplyer;
};

// grab info, calculate
$('#submit').click(function(){
    var itemBought = $('#item-bought').val();
    var pricePaid = $('#price-paid').val();
    var newPrice = calculate(pricePaid, 5);
    displayItem(itemBought, newPrice);
    cacheItem(itemBought, pricePaid);
    $('#item-bought').val('');
    $('#price-paid').val('');
});
var calculate = function(price, multiplyer) {
    return price * multiplyer;
};
var displayItem = function(item, price){
    $('#item').append('<li>' + item  + " " + price + " " + "<input type='submit' value='delete' id='delete'></li>");
};
var cachedItems = [];
var List = {};
var cacheItem = function(item, price){
    cachedItems.push({item: item, price: price});
};
// var removeItem = function(item);
// $('#item').on('click', function(){
//     console.log(console.log(cachedItems));
// });
$('#save').click(function(){
    if ($('#listName').val() === ""){
        alert("Please enter a name for your list.");
        return;
    } 
    List.name = $('#listName').val();
    List.items = cachedItems;
    postToDB(List);
    // console.log(List);
});


    















