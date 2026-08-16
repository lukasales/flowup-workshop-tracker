using FlowUp.Workshops.Api.Data;
using FlowUp.Workshops.Api.DTOs.Colaboradores;
using FlowUp.Workshops.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlowUp.Workshops.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ColaboradoresController : ControllerBase
{
    private readonly AppDbContext _context;

    public ColaboradoresController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ColaboradorResponse>>> GetAll()
    {
        var colaboradores = await _context.Colaboradores
            .AsNoTracking()
            .OrderBy(c => c.Id)
            .Select(c => new ColaboradorResponse
            {
                Id = c.Id,
                Nome = c.Nome
            })
            .ToListAsync();

        return Ok(colaboradores);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ColaboradorResponse>> GetById(int id)
    {
        var colaborador = await _context.Colaboradores
            .AsNoTracking()
            .Where(c => c.Id == id)
            .Select(c => new ColaboradorResponse
            {
                Id = c.Id,
                Nome = c.Nome
            })
            .FirstOrDefaultAsync();

        if (colaborador is null)
        {
            return NotFound();
        }

        return Ok(colaborador);
    }

    [HttpPost]
    public async Task<ActionResult<ColaboradorResponse>> Create([FromBody] CreateColaboradorRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Nome))
        {
            return BadRequest("Nome é obrigatório.");
        }

        var colaborador = new Colaborador
        {
            Nome = request.Nome.Trim()
        };

        _context.Colaboradores.Add(colaborador);
        await _context.SaveChangesAsync();

        var response = new ColaboradorResponse
        {
            Id = colaborador.Id,
            Nome = colaborador.Nome
        };

        return CreatedAtAction(nameof(GetById), new { id = colaborador.Id }, response);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateColaboradorRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Nome))
        {
            return BadRequest("Nome é obrigatório.");
        }

        var colaborador = await _context.Colaboradores
            .FirstOrDefaultAsync(c => c.Id == id);

        if (colaborador is null)
        {
            return NotFound();
        }

        colaborador.Nome = request.Nome.Trim();
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var colaborador = await _context.Colaboradores
            .FirstOrDefaultAsync(c => c.Id == id);

        if (colaborador is null)
        {
            return NotFound();
        }

        _context.Colaboradores.Remove(colaborador);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
