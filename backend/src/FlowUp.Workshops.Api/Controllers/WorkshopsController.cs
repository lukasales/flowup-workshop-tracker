using FlowUp.Workshops.Api.Data;
using FlowUp.Workshops.Api.DTOs.Colaboradores;
using FlowUp.Workshops.Api.DTOs.Workshops;
using FlowUp.Workshops.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlowUp.Workshops.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class WorkshopsController : ControllerBase
{
    private readonly AppDbContext _context;

    public WorkshopsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WorkshopResponse>>> GetAll()
    {
        var workshops = await _context.Workshops
            .AsNoTracking()
            .Include(w => w.Participacoes)
                .ThenInclude(p => p.Colaborador)
            .OrderBy(w => w.Id)
            .Select(w => new WorkshopResponse
            {
                Id = w.Id,
                Nome = w.Nome,
                DataRealizacao = w.DataRealizacao,
                Descricao = w.Descricao,
                Colaboradores = w.Participacoes
                    .Select(p => new ColaboradorResponse
                    {
                        Id = p.Colaborador.Id,
                        Nome = p.Colaborador.Nome
                    })
                    .OrderBy(c => c.Id)
                    .ToList()
            })
            .ToListAsync();

        return Ok(workshops);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<WorkshopResponse>> GetById(int id)
    {
        var workshop = await _context.Workshops
            .AsNoTracking()
            .Include(w => w.Participacoes)
                .ThenInclude(p => p.Colaborador)
            .Where(w => w.Id == id)
            .Select(w => new WorkshopResponse
            {
                Id = w.Id,
                Nome = w.Nome,
                DataRealizacao = w.DataRealizacao,
                Descricao = w.Descricao,
                Colaboradores = w.Participacoes
                    .Select(p => new ColaboradorResponse
                    {
                        Id = p.Colaborador.Id,
                        Nome = p.Colaborador.Nome
                    })
                    .OrderBy(c => c.Id)
                    .ToList()
            })
            .FirstOrDefaultAsync();

        if (workshop is null)
        {
            return NotFound();
        }

        return Ok(workshop);
    }

    [HttpPost]
    public async Task<ActionResult<WorkshopResponse>> Create([FromBody] CreateWorkshopRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Nome))
        {
            return BadRequest("Nome é obrigatório.");
        }

        if (string.IsNullOrWhiteSpace(request.Descricao))
        {
            return BadRequest("Descricao é obrigatória.");
        }

        var workshop = new Workshop
        {
            Nome = request.Nome.Trim(),
            DataRealizacao = request.DataRealizacao,
            Descricao = request.Descricao.Trim()
        };

        _context.Workshops.Add(workshop);
        await _context.SaveChangesAsync();

        var response = new WorkshopResponse
        {
            Id = workshop.Id,
            Nome = workshop.Nome,
            DataRealizacao = workshop.DataRealizacao,
            Descricao = workshop.Descricao,
            Colaboradores = Array.Empty<ColaboradorResponse>()
        };

        return CreatedAtAction(nameof(GetById), new { id = workshop.Id }, response);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateWorkshopRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Nome))
        {
            return BadRequest("Nome é obrigatório.");
        }

        if (string.IsNullOrWhiteSpace(request.Descricao))
        {
            return BadRequest("Descricao é obrigatória.");
        }

        var workshop = await _context.Workshops
            .FirstOrDefaultAsync(w => w.Id == id);

        if (workshop is null)
        {
            return NotFound();
        }

        workshop.Nome = request.Nome.Trim();
        workshop.DataRealizacao = request.DataRealizacao;
        workshop.Descricao = request.Descricao.Trim();

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var workshop = await _context.Workshops
            .FirstOrDefaultAsync(w => w.Id == id);

        if (workshop is null)
        {
            return NotFound();
        }

        _context.Workshops.Remove(workshop);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost("{workshopId:int}/participantes/{colaboradorId:int}")]
    public async Task<IActionResult> AddParticipante(int workshopId, int colaboradorId)
    {
        var workshop = await _context.Workshops
            .FirstOrDefaultAsync(w => w.Id == workshopId);

        if (workshop is null)
        {
            return NotFound();
        }

        var colaborador = await _context.Colaboradores
            .FirstOrDefaultAsync(c => c.Id == colaboradorId);

        if (colaborador is null)
        {
            return NotFound();
        }

        var jaExiste = await _context.Participacoes
            .AnyAsync(p => p.WorkshopId == workshopId && p.ColaboradorId == colaboradorId);

        if (jaExiste)
        {
            return Conflict();
        }

        var participacao = new Participacao
        {
            WorkshopId = workshopId,
            ColaboradorId = colaboradorId
        };

        _context.Participacoes.Add(participacao);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{workshopId:int}/participantes/{colaboradorId:int}")]
    public async Task<IActionResult> RemoveParticipante(int workshopId, int colaboradorId)
    {
        var participacao = await _context.Participacoes
            .FirstOrDefaultAsync(p => p.WorkshopId == workshopId && p.ColaboradorId == colaboradorId);

        if (participacao is null)
        {
            return NotFound();
        }

        _context.Participacoes.Remove(participacao);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
