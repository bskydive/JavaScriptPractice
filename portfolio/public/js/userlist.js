$(document).ready(function () {
//(function ($) {

    $(".c-column-center").addClass("col-md-12");
    $(".c-column-userList").addClass("col-md-3");
    $(".c-label-input-field").addClass("col-md-2");
    $(".c-input-field").addClass("col-md-6");
    //$("#id-container-userAdd").addClass("hidden");


    //function offsetResize() {
    //    var navTopHeight = $('.c-columnNavTop').height();
    //    $(".c-containerMain").css('padding-top', navTopHeight);
    //    $(".c-anchorOffset").css('top', -(navTopHeight - 30));
    //}
    //
    //offsetResize();
    //$(window).resize(function () {
    //    offsetResize();
    //});

    // Generate four random hex digits.
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };

    // Generate a pseudo-GUID by concatenating random hexadecimal.
    function guid() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };


    var UserListView = Backbone.View.extend({
        el: '.page',
        render: function () {
            var that = this;

            var usersCollection1 = new UsersCollection();

            usersCollection1.fetch({
                success: function (users) {
                    var template1 = _.template($('#id-user-list-template').html(), {users: users.models});
                    that.$el.html(template1);
                }
            });

        }
    });

    var Router = Backbone.Router.extend({

        routes: {
            '': 'routeUserList',
            '!/': 'routeUserList',
            '!/id-container-userAdd': 'routeUserAdd'
        },

        routeUserList: function () {
            $('.c-containerMain').hide();
            $("#id-container-userList").show();
        },

        routeUserAdd: function () {
            $('.c-containerMain').hide();
            $('#id-container-userAdd').show();
        }
    });

    var userListView1 = new UserListView();

    var router1 = new Router();

    router1.on('route:routeUserList', function () {
        "use strict";
        userListView1.render();
    });


    Backbone.history.start();


});


//})(jQuery);


//(function ($) {
//
//    Friend = Backbone.Model.extend({
//        //Create a model to hold friend atribute
//        name: null
//    });
//
//    Friends = Backbone.Collection.extend({
//        //This is our Friends collection and holds our Friend models
//        initialize: function (models, options) {
//            this.bind("add", options.view.addFriendLi);
//            //Listen for new additions to the collection and call a view function if so
//        }
//    });
//
//    AppView = Backbone.View.extend({
//        el: $("body"),
//        initialize: function () {
//            this.friends = new Friends( null, { view: this });
//            //Create a friends collection when the view is initialized.
//            //Pass it a reference to this view to create a connection between the two
//        },
//        events: {
//            "click #add-friend":  "showPrompt",
//        },
//        showPrompt: function () {
//            var friend_name = prompt("Who is your friend?");
//            var friend_model = new Friend({ name: friend_name });
//            //Add a new friend model to our friend collection
//            this.friends.add( friend_model );
//        },
//        addFriendLi: function (model) {
//            //The parameter passed is a reference to the model that was added
//            $("#friends-list").append("<li>" + model.get('name') + "</li>");
//            //Use .get to receive attributes of the model
//        }
//    });
//
//    var appview = new AppView;
//})(jQuery);
//

//$(function () {
//
//    var AppState = Backbone.Model.extend({
//        defaults: {
//            username: "",
//            state: "start"
//        }
//    });
//
//    var appState = new AppState();
//
//    var UserNameModel = Backbone.Model.extend({ // Модель пользователя
//        defaults: {
//            "Name": ""
//        }
//    });
//
//    var Family = Backbone.Collection.extend({ // Коллекция пользователей
//
//        model: UserNameModel,
//
//        checkUser: function (username) { // Проверка пользователя
//            var findResult = this.find(function (user) { return user.get("Name") == username })
//            return findResult != null;
//        }
//
//    });
//
//    var MyFamily = new Family([ // Моя семья
//        {Name: "Саша" },
//        { Name: "Юля" },
//        { Name: "Елизар" },
//
//    ]);
//
//
//
//    var Controller = Backbone.Router.extend({
//        routes: {
//            "": "start", // Пустой hash-тэг
//            "!/": "start", // Начальная страница
//            "!/success": "success", // Блок удачи
//            "!/error": "error" // Блок ошибки
//        },
//
//        start: function () {
//            appState.set({ state: "start" });
//        },
//
//        success: function () {
//            appState.set({ state: "success" });
//        },
//
//        error: function () {
//            appState.set({ state: "error" });
//        }
//    });
//
//    var controller = new Controller(); // Создаём контроллер
//
//
//    var Block = Backbone.View.extend({
//        el: $("#block"), // DOM элемент widget'а
//
//        templates: { // Шаблоны на разное состояние
//            "start": _.template($('#start').html()),
//            "success": _.template($('#success').html()),
//            "error": _.template($('#error').html())
//        },
//
//        events: {
//            "click input:button": "check" // Обработчик клика на кнопке "Проверить"
//        },
//
//        initialize: function () { // Подписка на событие модели
//            this.model.bind('change', this.render, this);
//        },
//
//        check: function () {
//            var username = this.el.find("input:text").val();
//            var find = MyFamily.checkUser(username); // Проверка имени пользователя
//            appState.set({ // Сохранение имени пользователя и состояния
//                "state": find ? "success" : "error",
//                "username": username
//            });
//        },
//
//        render: function () {
//            var state = this.model.get("state");
//            $(this.el).html(this.templates[state](this.model.toJSON()));
//            return this;
//        }
//    });
//
//    var block = new Block({ model: appState }); // создадим объект
//
//    appState.trigger("change"); // Вызовем событие change у модели
//
//    appState.bind("change:state", function () { // подписка на смену состояния для контроллера
//        var state = this.get("state");
//        if (state == "start")
//            controller.navigate("!/", false); // false потому, что нам не надо
//                                              // вызывать обработчик у Router
//        else
//            controller.navigate("!/" + state, false);
//    });
//
//    Backbone.history.start();  // Запускаем HTML5 History push
//
//
//});
//