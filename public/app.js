

var MOCK_HISTORY = {
    "History": [
        {
            "id": "1111111",
            "Username": "Bill",
            "Password": "bar",
            "Item": {
                "Item": "Drinks",
                "Price": "10"
            }
        },
        {
            "id": "2222222",
            "Username": "John",
            "Password": "bar",
            "Item": {
                "Item": "Hat",
                "Price": "12"
            }
        }
    ]
};

var getItem = MOCK_HISTORY.History[0].Item;



// test db and endpoints
var data = {pass: 'Yes'};

var printLine = function(result){
    $('#test').append(data.pass);
}

$('#testBttn').click(function(){
    // getPage();
    postToDB(data);
    // $('#test').append(data.pass);
});

var getPage = function(){
    var ajax = $.ajax('/a', {
        type: 'GET',
        dataType: 'json'
    });
    ajax.done(  function  (result)    {
        console.log(result);
        printLine(result);
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
        console.log('I am ' + result);
    }); 

};
// ShoppingList.prototype.addItem = function(name) {
//     var item = {
//         'name': name
//     };
//     var ajax = $.ajax('/items', {
//         type: 'POST',
//         data: JSON.stringify(item),
//         dataType: 'json',
//         contentType: 'application/json'
//     });
//     ajax.done(this.getItems.bind(this));
// };





// calculates function
var calculate = function(price, multiplyer) {
    return price * multiplyer;
};
// pushes information to mock database
var addHistory = function(id, username, item){
    MOCK_HISTORY.History.push({"id": id, "Username": username, "Password": "bar",
                                "Item": {"Item": item}});
};

// create account with username and password
var createAccount = function(username, password) {
    MOCK_HISTORY.History.push({"id": "3333333", "Username": username, 
                                "Password": password });
};

// login function
var login = function(username, password){
    // user regular loop with constructor functions
    for (var user in MOCK_HISTORY.History){
        if(MOCK_HISTORY.History[user].Username == username && MOCK_HISTORY.History[user].Password == password){
            console.log("Yes " + username + " Yes " + password);
            return true;
        } else {
            console.log("wrong password");
        }
    }

};
// display previous purchases
var display = function(item){
    $.each(item, function(index, value){
        console.log(index + ': ' + value);
        $('#previous-list').append(value + "<br>");
    });
}

// grab info, calculate
$('#submit').click(function(){
    var itemBought = $('#item-bought').val();
    var pricePaid = $('#price-paid').val();
    var actualPricePaid = calculate(pricePaid, 5);
    $("#item").text(itemBought);
    $("#actual-price").text(actualPricePaid);
    $('#item-bought').val('');
    $('#price-paid').val('');
});

// create account
$('#submit-user').click(function(){
    var username = $('#create-username').val();
    var password = $('#password').val();
    createAccount(username, password);
});

// login
$('#submit-login').click(function(){
    var username = $('#enter-username').val();
    var password = $('#enter-password').val();
    login(username, password);
    $('#enter-username').val('');
    $('#enter-password').val('');
    // display history
    if(login){
        display(MOCK_HISTORY.History[0].Item);
    }
    
});













