from django.urls import path
from .views import (
    ProductListAPIView,
    ProductDetailAPIView,
    CategoryListAPIView,
    OrderCreateAPIView
)

urlpatterns = [
    path('products/', ProductListAPIView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('categories/', CategoryListAPIView.as_view(), name='category-list'),
    path('orders/', OrderCreateAPIView.as_view(), name='order-create'),
]
