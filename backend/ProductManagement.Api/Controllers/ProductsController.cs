using Microsoft.AspNetCore.Mvc;
using ProductManagement.Api.Models;
using ProductManagement.Api.Services;

namespace ProductManagement.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public ActionResult<IReadOnlyCollection<Product>> GetAll()
    {
        return Ok(_productService.GetAll());
    }

    [HttpGet("{id:int}")]
    public ActionResult<Product> GetById(int id)
    {
        var product = _productService.GetById(id);

        if (product is null)
        {
            return NotFound();
        }

        return Ok(product);
    }

    [HttpPost]
    public ActionResult<Product> Create(Product product)
    {
        var createdProduct = _productService.Create(product);

        return CreatedAtAction(
            nameof(GetById),
            new { id = createdProduct.Id },
            createdProduct
        );
    }

    [HttpPut("{id:int}")]
    public IActionResult Update(int id, Product product)
    {
        var updated = _productService.Update(id, product);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        var deleted = _productService.Delete(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}