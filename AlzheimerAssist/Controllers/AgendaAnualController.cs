using AlzheimerAssist.Data;
using AlzheimerAssist.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AlzheimerAssist.Controllers
{
    [ApiController]
    [Route("agenda-anual")]
    public class AgendaAnualController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AgendaAnualController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{vinculoId}")]
        public async Task<ActionResult<List<AgendaAnual>>> ListarPorVinculo(
            int vinculoId
        )
        {
            var eventos = await _context.AgendaAnual
                .Where(a => a.VinculoId == vinculoId)
                .ToListAsync();

            return Ok(eventos);
        }

        [HttpPost]
        public async Task<ActionResult> Criar(
            [FromBody] AgendaAnualRequest request
        )
        {
            var vinculo = await _context.Vinculos
                .FirstOrDefaultAsync(v => v.Id == request.VinculoId);

            if (vinculo == null)
            {
                return NotFound("Vínculo não encontrado.");
            }

            var evento = new AgendaAnual(
                request.VinculoId,
                vinculo,
                request.Titulo,
                request.Data
            );

            _context.AgendaAnual.Add(evento);

            await _context.SaveChangesAsync();

            return Ok("Evento cadastrado com sucesso.");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Remover(int id)
        {
            var evento = await _context.AgendaAnual
                .FindAsync(id);

            if (evento == null)
            {
                return NotFound("Evento não encontrado.");
            }

            _context.AgendaAnual.Remove(evento);

            await _context.SaveChangesAsync();

            return Ok("Evento removido com sucesso.");
        }
    }

    public class AgendaAnualRequest
    {
        public int VinculoId { get; set; }

        public string Titulo { get; set; } = string.Empty;

        public DateOnly Data { get; set; }
    }
}