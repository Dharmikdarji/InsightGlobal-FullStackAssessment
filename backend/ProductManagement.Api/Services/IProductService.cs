using ProductManagement.Api.Models;

namespace ProductManagement.Api.Services;

public interface IProductService
{
    IReadOnlyCollection<Product> GetAll();

    Product? GetById(int id);

    Product Create(Product product);

    bool Update(int id, Product product);

    bool Delete(int id);
}