"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = require("../../utils/request");
Page({
    data: {
        id: 0,
        goods: null,
        addresses: [],
        selectedAddressId: 0,
        loading: false
    },
    onLoad: function (options) {
        this.setData({ id: options.id });
    },
    onShow: function () {
        this.loadGoods();
        this.loadAddresses();
    },
    loadGoods: function () {
        var self = this;
        request_1.default({
            url: "/index/goods/show?id=" + this.data.id,
            success: function (goods) {
                self.setData({ goods: goods });
            },
            fail: function (e) {
                wx.showToast({ title: e.errMsg, icon: 'none' });
            }
        });
    },
    loadAddresses: function () {
        var self = this;
        request_1.default({
            url: '/index/address/all',
            success: function (addresses) {
                self.setData({ addresses: addresses });
                var selectedAddressId = 0;
                addresses.forEach(function (item) {
                    if (item.default) {
                        selectedAddressId = item.id;
                    }
                });
                if (selectedAddressId === 0 && addresses.length > 0) {
                    selectedAddressId = addresses[0].id;
                }
                self.setData({ selectedAddressId: selectedAddressId });
            }
        });
    },
    handleAddressTap: function (e) {
        var id = e.currentTarget.dataset.id;
        this.setData({ selectedAddressId: id });
    },
    handleAddAddress: function () {
        wx.navigateTo({
            url: '/pages/address/create'
        });
    },
    handleBuy: function () {
        if (!this.data.selectedAddressId) {
            wx.showToast({ title: '请完善地址信息', icon: 'none' });
            return;
        }
        this.buy();
    },
    buy: function () {
        var _this = this;
        this.setData({ loading: true });
        var address = this.data.addresses.filter(function (item) { return item.id === _this.data.selectedAddressId; })[0];
        var data = {
            goods_id: this.data.id,
            realname: address.realname,
            phone: address.phone,
            address: address.address
        };
        var self = this;
        request_1.default({
            url: '/index/goods/buy',
            method: 'POST',
            data: data,
            success: function (order) {
                self.pay(order);
            },
            fail: function (e) {
                wx.showToast({ title: e.errMsg, icon: 'none' });
                this.setData({ loading: false });
            }
        });
    },
    pay: function (order) {
        var self = this;
        request_1.default({
            url: "/index/order/pay?order_id=" + order.order_id,
            success: function () {
                setTimeout(function () { return wx.redirectTo({
                    url: "/pages/order/detail?id=" + order.order_id
                }); }, 1500);
            },
            fail: function (e) {
                wx.showToast({ title: e.errMsg, icon: 'none' });
            },
            complete: function () {
                self.setData({ loading: false });
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQTBDO0FBUTFDLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLEVBQUUsRUFBRSxDQUFDO1FBQ0wsS0FBSyxFQUFFLElBQUk7UUFDWCxTQUFTLEVBQUUsRUFBRTtRQUNiLGlCQUFpQixFQUFFLENBQUM7UUFDcEIsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELE1BQU0sWUFBQyxPQUFZO1FBQ2pCLElBQUksQ0FBQyxPQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUNELE1BQU07UUFDSixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDaEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO0lBQ3RCLENBQUM7SUFDRCxTQUFTO1FBQ1AsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2pCLGlCQUFPLENBQUM7WUFDTixHQUFHLEVBQUUsMEJBQXdCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBSTtZQUMzQyxPQUFPLFlBQUMsS0FBVTtnQkFDaEIsSUFBSSxDQUFDLE9BQVEsQ0FBQyxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUMsQ0FBQTtZQUMxQixDQUFDO1lBQ0QsSUFBSSxZQUFDLENBQU07Z0JBQ1QsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1lBQ2pELENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsYUFBYTtRQUNYLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNqQixpQkFBTyxDQUFDO1lBQ04sR0FBRyxFQUFFLG9CQUFvQjtZQUN6QixPQUFPLFlBQUMsU0FBYztnQkFDcEIsSUFBSSxDQUFDLE9BQVEsQ0FBQyxFQUFFLFNB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QUFVLENBQUM7b0JBQzdCLEdBQUcsRUFBRSw0QkFBMEIsS0FBSyxDQUFDLFFBQVU7aUJBQ2hELENBQUMsRUFGZSxDQUVmLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDWCxDQUFDO1lBQ0QsSUFBSSxZQUFDLENBQU07Z0JBQ1QsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1lBQ2pELENBQUM7WUFDRCxRQUFRO2dCQUNOLElBQUksQ0FBQyxPQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUNuQyxDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXF1ZXN0IGZyb20gXCIuLi8uLi91dGlscy9yZXF1ZXN0XCI7XG5cbi8vaW5kZXguanNcbi8v6I635Y+W5bqU55So5a6e5L6LXG4vLyBpbXBvcnQgeyBJTXlBcHAgfSBmcm9tICcuLi8uLi9hcHAnXG5cbi8vIGNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KClcblxuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICBpZDogMCxcbiAgICBnb29kczogbnVsbCxcbiAgICBhZGRyZXNzZXM6IFtdLFxuICAgIHNlbGVjdGVkQWRkcmVzc0lkOiAwLFxuICAgIGxvYWRpbmc6IGZhbHNlXG4gIH0sXG4gIG9uTG9hZChvcHRpb25zOiBhbnkpIHtcbiAgICB0aGlzLnNldERhdGEhKHsgaWQ6IG9wdGlvbnMuaWQgfSlcbiAgfSxcbiAgb25TaG93KCkge1xuICAgIHRoaXMubG9hZEdvb2RzKClcbiAgICB0aGlzLmxvYWRBZGRyZXNzZXMoKVxuICB9LFxuICBsb2FkR29vZHMoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICByZXF1ZXN0KHtcbiAgICAgIHVybDogYC9pbmRleC9nb29kcy9zaG93P2lkPSR7dGhpcy5kYXRhLmlkfWAsXG4gICAgICBzdWNjZXNzKGdvb2RzOiBhbnkpIHtcbiAgICAgICAgc2VsZi5zZXREYXRhISh7IGdvb2RzIH0pXG4gICAgICB9LFxuICAgICAgZmFpbChlOiBhbnkpIHtcbiAgICAgICAgd3guc2hvd1RvYXN0KHsgdGl0bGU6IGUuZXJyTXNnLCBpY29uOiAnbm9uZScgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBsb2FkQWRkcmVzc2VzKCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgcmVxdWVzdCh7XG4gICAgICB1cmw6ICcvaW5kZXgvYWRkcmVzcy9hbGwnLFxuICAgICAgc3VjY2VzcyhhZGRyZXNzZXM6IGFueSkge1xuICAgICAgICBzZWxmLnNldERhdGEhKHsgYWRkcmVzc2VzIH0pXG4gICAgICAgIGxldCBzZWxlY3RlZEFkZHJlc3NJZCA9IDBcbiAgICAgICAgYWRkcmVzc2VzLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgIGlmIChpdGVtLmRlZmF1bHQpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkQWRkcmVzc0lkID0gaXRlbS5pZFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaWYgKHNlbGVjdGVkQWRkcmVzc0lkID09PSAwICYmIGFkZHJlc3Nlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgc2VsZWN0ZWRBZGRyZXNzSWQgPSBhZGRyZXNzZXNbMF0uaWRcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnNldERhdGEhKHsgc2VsZWN0ZWRBZGRyZXNzSWQgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBoYW5kbGVBZGRyZXNzVGFwKGU6IGFueSkge1xuICAgIGNvbnN0IGlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICB0aGlzLnNldERhdGEhKHsgc2VsZWN0ZWRBZGRyZXNzSWQ6IGlkIH0pXG4gIH0sXG4gIGhhbmRsZUFkZEFkZHJlc3MoKSB7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcvcGFnZXMvYWRkcmVzcy9jcmVhdGUnXG4gICAgfSlcbiAgfSxcbiAgaGFuZGxlQnV5KCkge1xuICAgIGlmICghdGhpcy5kYXRhLnNlbGVjdGVkQWRkcmVzc0lkKSB7XG4gICAgICB3eC5zaG93VG9hc3QoeyB0aXRsZTogJ+ivt+WujOWWhOWcsOWdgOS/oeaBrycsIGljb246ICdub25lJyB9KVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuYnV5KClcbiAgfSxcbiAgYnV5KCkge1xuICAgIHRoaXMuc2V0RGF0YSEoeyBsb2FkaW5nOiB0cnVlIH0pXG4gICAgY29uc3QgYWRkcmVzczogYW55ID0gdGhpcy5kYXRhLmFkZHJlc3Nlcy5maWx0ZXIoKGl0ZW06IGFueSkgPT4gaXRlbS5pZCA9PT0gdGhpcy5kYXRhLnNlbGVjdGVkQWRkcmVzc0lkKVswXVxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBnb29kc19pZDogdGhpcy5kYXRhLmlkLFxuICAgICAgcmVhbG5hbWU6IGFkZHJlc3MucmVhbG5hbWUsXG4gICAgICBwaG9uZTogYWRkcmVzcy5waG9uZSxcbiAgICAgIGFkZHJlc3M6IGFkZHJlc3MuYWRkcmVzc1xuICAgIH07XG4gICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9pbmRleC9nb29kcy9idXknLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBkYXRhLFxuICAgICAgc3VjY2VzcyhvcmRlcjogYW55KSB7XG4gICAgICAgIHNlbGYucGF5KG9yZGVyKVxuICAgICAgfSxcbiAgICAgIGZhaWwoZTogYW55KSB7XG4gICAgICAgIHd4LnNob3dUb2FzdCh7IHRpdGxlOiBlLmVyck1zZywgaWNvbjogJ25vbmUnIH0pXG4gICAgICAgIHRoaXMuc2V0RGF0YSEoeyBsb2FkaW5nOiBmYWxzZSB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIHBheShvcmRlcjogYW55KSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICByZXF1ZXN0KHtcbiAgICAgIHVybDogYC9pbmRleC9vcmRlci9wYXk/b3JkZXJfaWQ9JHtvcmRlci5vcmRlcl9pZH1gLFxuICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgICB1cmw6IGAvcGFnZXMvb3JkZXIvZGV0YWlsP2lkPSR7b3JkZXIub3JkZXJfaWR9YFxuICAgICAgICB9KSwgMTUwMClcbiAgICAgIH0sXG4gICAgICBmYWlsKGU6IGFueSkge1xuICAgICAgICB3eC5zaG93VG9hc3QoeyB0aXRsZTogZS5lcnJNc2csIGljb246ICdub25lJyB9KVxuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlKCkge1xuICAgICAgICBzZWxmLnNldERhdGEhKHsgbG9hZGluZzogZmFsc2UgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG59KVxuIl19