using AlzheimerAssist.Data;
using AlzheimerAssist.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AlzheimerAssist.Controllers
{
    [ApiController]
    [Route("observacoes")]
    public class ObservacoesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ObservacoesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{vinculoId}")]
        public async Task<ActionResult<List<Observacao>>> ListarPorVinculo(
            int vinculoId
        )
        {
            var observacoes = await _context.Observacoes
                .Where(o => o.VinculoId == vinculoId)
                .ToListAsync();

            return Ok(observacoes);
        }

        [HttpPost]
        public async Task<ActionResult> Criar(
            [FromBody] ObservacaoRequest request
        )
        {
            var vinculo = await _context.Vinculos
                .FirstOrDefaultAsync(v => v.Id == request.VinculoId);

            if (vinculo == null)
            {
                return NotFound("Vínculo não encontrado.");
            }

            var observacao = new Observacao(
                request.VinculoId,
                vinculo,
                request.Descricao
            );

            _context.Observacoes.Add(observacao);

            await _context.SaveChangesAsync();

            return Ok("Observação cadastrada com sucesso.");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Remover(int id)
        {
            var observacao = await _context.Observacoes
                .FindAsync(id);

            if (observacao == null)
            {
                return NotFound("Observação não encontrada.");
            }

            _context.Observacoes.Remove(observacao);

            await _context.SaveChangesAsync();

            return Ok("Observação removida com sucesso.");
        }
    }

    public class ObservacaoRequest
    {
        public int VinculoId { get; set; }

        public string Descricao { get; set; } = string.Empty;
    }
}