using AlzheimerAssist.Data;
using AlzheimerAssist.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AlzheimerAssist.Controllers
{
    [ApiController]
    [Route("pacientes")]
    public class PacientesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PacientesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Paciente>>> Listar()
        {
            var pacientes = await _context.Pacientes.ToListAsync();

            return Ok(pacientes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Paciente>> BuscarPorId(int id)
        {
            var paciente = await _context.Pacientes.FindAsync(id);

            if (paciente == null)
            {
                return NotFound("Paciente não encontrado.");
            }

            return Ok(paciente);
        }

        [HttpPost]
        public async Task<ActionResult> Cadastrar([FromBody] PacienteRequest request)
        {
            var emailExiste = await _context.Pacientes
                .AnyAsync(p => p.Email == request.Email);

            if (emailExiste)
            {
                return BadRequest("Este e-mail já está cadastrado.");
            }

            var cpfExiste = await _context.Pacientes
                .AnyAsync(p => p.Cpf == request.Cpf);

            if (cpfExiste)
            {
                return BadRequest("Este CPF já está cadastrado.");
            }

            var paciente = new Paciente(
                request.Nome,
                request.Email,
                request.Senha,
                request.Cpf,
                request.Foto
            );

            _context.Pacientes.Add(paciente);

            await _context.SaveChangesAsync();

            return Ok("Paciente cadastrado com sucesso.");
        }
    }

    public class PacienteRequest
    {
        public string Nome { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Senha { get; set; } = string.Empty;

        public string Cpf { get; set; } = string.Empty;

        public string Foto { get; set; } = string.Empty;
    }
}