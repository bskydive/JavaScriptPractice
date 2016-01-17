window.$(document).ready(function () {

    "use strict";
    var $ = window.$, Backbone = window.Backbone, console = window.console, _ = window._;

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


    //============================================COLLECTION======================================================

    function genUid() {

        return window.Date.now().toString() + "-" + Math.random().toString(36).substring(2, 15) + "-" + Math.random().toString(36).substring(2, 15);
    }


    function checkString(val) {

        return (val.toString() === val.toString);
    }

    function checkStringLength(val, min, max) {

        return (checkString(val) && val.length <= max && val.length >= min);
    }

    var UserListModel = Backbone.Model.extend({
        defaults: {
            firstName: "blankFirstName",
            lastName: "blankLastName",
            surName: "blankSurName",
            birthDate: new Date(1900, 0, 1),
            eMail: "blankEMail@stepanovv.ru",
            phoneNumber: "+71112233344",
            //order: userListView1.nextOrder(),
            uidNumber: genUid()
        },

        validate: function (attrs) {

            if (!checkStringLength(attrs.firstName, 3, 25)) {
                return "First name" + this.guidNumber.toString() + " should be 3 to 25 letters long";
            }

            if (!checkStringLength(attrs.lastName, 3, 25)) {
                return "Last name" + this.guidNumber.toString() + " should be 3 to 25 letters long";
            }

            if (!checkStringLength(attrs.surName, 3, 25)) {
                return "Surname " + this.guidNumber.toString() + " should be 3 to 25 letters long";
            }
        }
    });

    var UserListCollection = Backbone.Collection.extend({

        model: UserListModel,

        findUserName: function (username) {

            var findResult = this.find(function (user) {
                return user.get("firstName") === username;
            });
            return findResult !== null;

        }

    });


    function fillCollection(varCollection) {
        for (var i = 0; i <= 3; i++) {
            varCollection.add(
                {
                    firstName: "FirstName" + i.toString(),
                    lastName: "LastName" + i.toString(),
                    surName: "SurName" + i.toString(),
                    birthDate: new Date(1901, 0, i),
                    birthDateLocal: "",
                    eMail: i.toString() + "EMail@stepanovv.ru",
                    phoneNumber: "+7111223334" + i.toString()
                }
            );
        }

        if (varCollection.isValid) {
            console.log(varCollection.validationError);
        }
    }

    //================================================VIEW==================================================

    function toLocalDate(varDate, varLocale) {
        var options = {
            //era: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
            //weekday: 'long',
            //timezone: 'UTC',
            //hour: 'numeric',
            //minute: 'numeric',
            //second: 'numeric'
        };

        return varDate.toLocaleString(varLocale, options).toString();
    }

    var UserListView = Backbone.View.extend({
        el: "#id-tbody-userList",
        events: {
            'click .c-btn-edit': 'userEdit'
            //'click .c-btn-delete': 'routeUserDelete'
        },

        userEdit: function () {
            this.router.navigate('', {trigger: true});

            return false;
        },

        render: function () {
            var self = this;
            this.$el.html("");

            this.model.each(
                function (eachModel) {
                    var template = _.template($("#id-user-list-template").html());
                    eachModel.set('birthDateLocal', self.toLocalDate(eachModel.get('birthDate'), "ru"));
                    var html = template(eachModel.toJSON());
                    self.$el.append(html);

                }
            );
            return this;
        }

        //nextOrder: function () {
        //    if (!this.length) {
        //        return 1;
        //    }
        //    return this.last().get('order') + 1;
        //},
        //
        //comparator: 'order'
    });


    var UserEditView = Backbone.View().extend({
        el: "#id-form-userEdit",
        events: {
            'submit .edit-user-form': 'saveUser',
            //'click .delete': 'deleteUser'
        },

        saveUser: function (ev) {
            var userDetails = $(ev.currentTarget).serializeObject();
            var user = new User();
            user.save(userDetails, {
                success: function (user) {
                    router.navigate('', {trigger: true});
                }
            });
            return false;
        },
        deleteUser: function (ev) {
            this.user.destroy({
                success: function () {
                    console.log('destroyed');
                    router.navigate('', {trigger: true});
                }
            });
            return false;
        },


        render: function (options) {
            var self = this;
            this.$el.html("");

            if (options.uid) {
                this.model.each(
                    function (eachModel) {
                        if (eachModel.get('uidNumber') === options.uid) {

                            //todo catch absent uid's
                            var template = _.template($("#id-form-userEdit").html());
                            eachModel.set('birthDateLocal', self.toLocalDate(eachModel.get('birthDate'), "ru"));
                            var html = template(eachModel.toJSON());
                            self.$el.prepend(html);
                        }
                    }
                );
            }
            return this;
        }

    });

    //==============================================ROUTER====================================================
    var Router = Backbone.Router.extend({

        routes: {
            '': 'routeUserList',
            'add': 'routeUserAdd',
            'edit/:uidLink': 'routeUserEdit',
            'delete/:uidLink': 'routeUserDelete'
        },

        routeUserList: function () {
            $('.c-containerMain').hide();

            userListView1.render();

            $('#id-container-userList').show();
        },

        routeUserAdd: function () {
            $('.c-containerMain').hide();
            $('#id-container-userAdd').show();
        },

        routeUserEdit: function (uidLink) {
            $('.c-containerMain').hide();
            userEditView1.render({uid: uidLink});
            $('#id-container-userAdd').show();

        },

        routeUserDelete: function () {
            //$('.c-containerMain').hide();
            //$('#id-container-userAdd').show();
            userListView1.render();
        }
    });


    //==============================================CALCULATIONS====================================================

    var router1 = new Router();

    var userListCollection1 = new UserListCollection();

    fillCollection(userListCollection1);

    var userListView1 = new UserListView({model: userListCollection1, router: router1});

    var userEditView1 = new UserEditView({model: userListCollection1, router: router1});

    Backbone.history.start();


});