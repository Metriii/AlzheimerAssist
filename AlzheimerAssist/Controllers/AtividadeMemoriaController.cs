using AlzheimerAssist.Data;
using AlzheimerAssist.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AlzheimerAssist.Controllers
{
    [ApiController]
    [Route("atividade-memoria")]
    public class AtividadeMemoriaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AtividadeMemoriaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{pacienteId}")]
        public async Task<ActionResult<List<AtividadeMemoria>>> ListarPorPaciente(
            int pacienteId
        )
        {
            var atividades = await _context.AtividadesMemoria
                .Where(a => a.PacienteId == pacienteId)
                .ToListAsync();

            return Ok(atividades);
        }

        [HttpPost]
        public async Task<ActionResult> Criar(
            [FromBody] AtividadeMemoriaRequest request
        )
        {
            var paciente = await _context.Pacientes
                .FirstOrDefaultAsync(p => p.Id == request.PacienteId);

            if (paciente == null)
            {
                return NotFound("Paciente não encontrado.");
            }

            var atividade = new AtividadeMemoria(
                request.PacienteId,
                paciente,
                request.AtividadeAnimal,
                request.JogoMemoria,
                request.QuebraCabeca,
                request.AtividadeAssociacao
            );

            _context.AtividadesMemoria.Add(atividade);

            await _context.SaveChangesAsync();

            return Ok("Atividade cadastrada com sucesso.");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Remover(int id)
        {
            var atividade = await _context.AtividadesMemoria
                .FindAsync(id);

            if (atividade == null)
            {
                return NotFound("Atividade não encontrada.");
            }

            _context.AtividadesMemoria.Remove(atividade);

            await _context.SaveChangesAsync();

            return Ok("Atividade removida com sucesso.");
        }
    }

    public class AtividadeMemoriaRequest
    {
        public int PacienteId { get; set; }

        public bool AtividadeAnimal { get; set; }

        public bool JogoMemoria { get; set; }

        public bool QuebraCabeca { get; set; }

        public bool AtividadeAssociacao { get; set; }
    }
}