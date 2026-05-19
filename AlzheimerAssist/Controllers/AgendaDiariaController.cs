using AlzheimerAssist.Data;
using AlzheimerAssist.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AlzheimerAssist.Controllers
{
    [ApiController]
    [Route("agenda-diaria")]
    public class AgendaDiariaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AgendaDiariaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{vinculoId}")]
        public async Task<ActionResult<List<AgendaDiaria>>> ListarPorVinculo(
            int vinculoId
        )
        {
            var tarefas = await _context.AgendaDiaria
                .Where(t => t.VinculoId == vinculoId)
                .ToListAsync();

            return Ok(tarefas);
        }

        [HttpPost]
        public async Task<ActionResult> Criar(
            [FromBody] AgendaDiariaRequest request
        )
        {
            var vinculo = await _context.Vinculos
                .FirstOrDefaultAsync(v => v.Id == request.VinculoId);

            if (vinculo == null)
            {
                return NotFound("Vínculo não encontrado.");
            }

            var tarefa = new AgendaDiaria(
                request.VinculoId,
                vinculo,
                request.Nome
            );

            _context.AgendaDiaria.Add(tarefa);

            await _context.SaveChangesAsync();

            return Ok("Tarefa cadastrada com sucesso.");
        }

        [HttpPut("{id}/feito")]
        public async Task<ActionResult> MarcarComoFeito(int id)
        {
            var tarefa = await _context.AgendaDiaria
                .FindAsync(id);

            if (tarefa == null)
            {
                return NotFound("Tarefa não encontrada.");
            }

            tarefa.MarcarComoFeito();

            await _context.SaveChangesAsync();

            return Ok("Tarefa marcada como feita.");
        }

        [HttpPut("{id}/nao-feito")]
        public async Task<ActionResult> MarcarComoNaoFeito(int id)
        {
            var tarefa = await _context.AgendaDiaria
                .FindAsync(id);

            if (tarefa == null)
            {
                return NotFound("Tarefa não encontrada.");
            }

            tarefa.MarcarComoNaoFeito();

            await _context.SaveChangesAsync();

            return Ok("Tarefa marcada como não feita.");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Remover(int id)
        {
            var tarefa = await _context.AgendaDiaria
                .FindAsync(id);

            if (tarefa == null)
            {
                return NotFound("Tarefa não encontrada.");
            }

            _context.AgendaDiaria.Remove(tarefa);

            await _context.SaveChangesAsync();

            return Ok("Tarefa removida com sucesso.");
        }
    }

    public class AgendaDiariaRequest
    {
        public int VinculoId { get; set; }

        public string Nome { get; set; } = string.Empty;
    }
}