using AlzheimerAssist.Data;
using AlzheimerAssist.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AlzheimerAssist.Controllers
{
    [ApiController]
    [Route("vinculos")]
    public class VinculosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VinculosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Vinculo>>> Listar()
        {
            var vinculos = await _context.Vinculos
                .Include(v => v.Paciente)
                .Include(v => v.Cuidador)
                .ToListAsync();

            return Ok(vinculos);
        }

        [HttpPost]
        public async Task<ActionResult> Criar([FromBody] VinculoRequest request)
        {
            var paciente = await _context.Pacientes
                .FirstOrDefaultAsync(p => p.Email == request.EmailPaciente);

            if (paciente == null)
            {
                return NotFound("Paciente não encontrado.");
            }

            var cuidador = await _context.Cuidadores
                .FirstOrDefaultAsync(c => c.Email == request.EmailCuidador);

            if (cuidador == null)
            {
                return NotFound("Cuidador não encontrado.");
            }

            var vinculoExiste = await _context.Vinculos
                .AnyAsync(v =>
                    v.PacienteId == paciente.Id &&
                    v.CuidadorId == cuidador.Id
                );

            if (vinculoExiste)
            {
                return BadRequest("Este vínculo já existe.");
            }

            var vinculo = new Vinculo(
                paciente.Id,
                paciente,
                cuidador.Id,
                cuidador
            );

            _context.Vinculos.Add(vinculo);

            await _context.SaveChangesAsync();

            return Ok("Vínculo criado com sucesso.");
        }
    }

    public class VinculoRequest
    {
        public string EmailPaciente { get; set; } = string.Empty;

        public string EmailCuidador { get; set; } = string.Empty;
    }
}