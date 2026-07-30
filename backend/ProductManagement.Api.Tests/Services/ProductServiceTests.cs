using ProductManagement.Api.Models;
using ProductManagement.Api.Services;

namespace ProductManagement.Api.Tests.Services;

public class ProductServiceTests
{
    [Fact]
    public void GetAll_ReturnsSeededProducts()
    {
        var service = new ProductService();

        var products = service.GetAll();

        Assert.NotNull(products);
        Assert.NotEmpty(products);
    }

    [Fact]
    public void GetById_WithValidId_ReturnsProduct()
    {
        var service = new ProductService();
        var existingProduct = service.GetAll().First();

        var result = service.GetById(existingProduct.Id);

        Assert.NotNull(result);
        Assert.Equal(existingProduct.Id, result.Id);
    }

    [Fact]
    public void GetById_WithInvalidId_ReturnsNull()
    {
        var service = new ProductService();

        var result = service.GetById(9999);

        Assert.Null(result);
    }

    [Fact]
    public void Create_AddsProductAndAssignsId()
    {
        var service = new ProductService();
        var product = new Product
        {
            Name = "Test Product",
            Description = "Test Description",
            Price = 25.99m,
            Quantity = 10
        };

        var createdProduct = service.Create(product);

        Assert.True(createdProduct.Id > 0);
        Assert.Equal("Test Product", createdProduct.Name);
        Assert.Contains(service.GetAll(), p => p.Id == createdProduct.Id);
    }

    [Fact]
    public void Update_WithValidId_UpdatesProduct()
    {
        var service = new ProductService();
        var existingProduct = service.GetAll().First();

        var updatedProduct = new Product
        {
            Id = existingProduct.Id,
            Name = "Updated Product",
            Description = "Updated Description",
            Price = 99.99m,
            Quantity = 5
        };

        var result = service.Update(existingProduct.Id, updatedProduct);

        Assert.True(result);

        var savedProduct = service.GetById(existingProduct.Id);

        Assert.NotNull(savedProduct);
        Assert.Equal("Updated Product", savedProduct.Name);
        Assert.Equal("Updated Description", savedProduct.Description);
        Assert.Equal(99.99m, savedProduct.Price);
        Assert.Equal(5, savedProduct.Quantity);
    }

    [Fact]
    public void Update_WithInvalidId_ReturnsFalse()
    {
        var service = new ProductService();
        var product = new Product
        {
            Name = "Missing Product",
            Description = "Does not exist",
            Price = 10m,
            Quantity = 1
        };

        var result = service.Update(9999, product);

        Assert.False(result);
    }

    [Fact]
    public void Delete_WithValidId_RemovesProduct()
    {
        var service = new ProductService();
        var existingProduct = service.GetAll().First();

        var result = service.Delete(existingProduct.Id);

        Assert.True(result);
        Assert.Null(service.GetById(existingProduct.Id));
    }

    [Fact]
    public void Delete_WithInvalidId_ReturnsFalse()
    {
        var service = new ProductService();

        var result = service.Delete(9999);

        Assert.False(result);
    }
}