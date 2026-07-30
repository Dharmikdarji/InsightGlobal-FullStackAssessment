using ProductManagement.Api.Models;

namespace ProductManagement.Api.Services;

public class ProductService : IProductService
{
    private readonly List<Product> _products =
    [
        new Product
        {
            Id = 1,
            Name = "Wireless Keyboard",
            Description = "Compact wireless keyboard with quiet keys.",
            Price = 49.99m,
            Quantity = 12
        },
        new Product
        {
            Id = 2,
            Name = "USB-C Hub",
            Description = "Multi-port adapter with HDMI and USB support.",
            Price = 69.99m,
            Quantity = 8
        },
        new Product
        {
            Id = 3,
            Name = "Laptop Stand",
            Description = "Adjustable aluminum stand for laptops.",
            Price = 39.99m,
            Quantity = 4
        }
    ];

    private int _nextId = 4;

    public IReadOnlyCollection<Product> GetAll()
    {
        return _products;
    }

    public Product? GetById(int id)
    {
        return _products.FirstOrDefault(product => product.Id == id);
    }

    public Product Create(Product product)
    {
        product.Id = _nextId++;
        _products.Add(product);

        return product;
    }

    public bool Update(int id, Product product)
    {
        var existingProduct = GetById(id);

        if (existingProduct is null)
        {
            return false;
        }

        existingProduct.Name = product.Name;
        existingProduct.Description = product.Description;
        existingProduct.Price = product.Price;
        existingProduct.Quantity = product.Quantity;

        return true;
    }

    public bool Delete(int id)
    {
        var product = GetById(id);

        return product is not null && _products.Remove(product);
    }
}