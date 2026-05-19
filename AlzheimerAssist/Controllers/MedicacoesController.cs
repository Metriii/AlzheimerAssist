using AlzheimerAssist.Data;
using AlzheimerAssist.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AlzheimerAssist.Controllers
{
    [ApiController]
    [Route("medicacoes")]
    public class MedicacoesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MedicacoesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{pacienteId}")]
        public async Task<ActionResult<List<Medicacao>>> ListarPorPaciente(
            int pacienteId
        )
        {
            var medicacoes = await _context.Medicacoes
                .Where(m => m.PacienteId == pacienteId)
                .ToListAsync();

            return Ok(medicacoes);
        }

        [HttpPost]
        public async Task<ActionResult> Criar(
            [FromBody] MedicacaoRequest request
        )
        {
            var paciente = await _context.Pacientes
                .FirstOrDefaultAsync(p => p.Id == request.PacienteId);

            if (paciente == null)
            {
                return NotFound("Paciente não encontrado.");
            }

            var medicacao = new Medicacao(
                request.PacienteId,
                paciente,
                request.Nome,
                request.Horario
            );

            _context.Medicacoes.Add(medicacao);

            await _context.SaveChangesAsync();

            return Ok("Medicação cadastrada com sucesso.");
        }

        [HttpPut("{id}/tomado")]
        public async Task<ActionResult> MarcarComoTomado(int id)
        {
            var medicacao = await _context.Medicacoes.FindAsync(id);

            if (medicacao == null)
            {
                return NotFound("Medicação não encontrada.");
            }

            medicacao.MarcarComoTomado();

            await _context.SaveChangesAsync();

            return Ok("Medicação marcada como tomada.");
        }

        [HttpPut("{id}/nao-tomado")]
        public async Task<ActionResult> MarcarComoNaoTomado(int id)
        {
            var medicacao = await _context.Medicacoes.FindAsync(id);

            if (medicacao == null)
            {
                return NotFound("Medicação não encontrada.");
            }

            medicacao.MarcarComoNaoTomado();

            await _context.SaveChangesAsync();

            return Ok("Medicação marcada como não tomada.");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Remover(int id)
        {
            var medicacao = await _context.Medicacoes.FindAsync(id);

            if (medicacao == null)
            {
                return NotFound("Medicação não encontrada.");
            }

            _context.Medicacoes.Remove(medicacao);

            await _context.SaveChangesAsync();

            return Ok("Medicação removida com sucesso.");
        }
    }

    public class MedicacaoRequest
    {
        public int PacienteId { get; set; }

        public string Nome { get; set; } = string.Empty;

        public TimeOnly Horario { get; set; }
    }
}