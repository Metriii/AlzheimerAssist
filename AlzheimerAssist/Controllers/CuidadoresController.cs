using AlzheimerAssist.Data;
using AlzheimerAssist.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AlzheimerAssist.Controllers
{
    [ApiController]
    [Route("cuidadores")]
    public class CuidadoresController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CuidadoresController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Cuidador>>> Listar()
        {
            var cuidadores = await _context.Cuidadores.ToListAsync();

            return Ok(cuidadores);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Cuidador>> BuscarPorId(int id)
        {
            var cuidador = await _context.Cuidadores.FindAsync(id);

            if (cuidador == null)
            {
                return NotFound("Cuidador não encontrado.");
            }

            return Ok(cuidador);
        }

        [HttpPost]
        public async Task<ActionResult> Cadastrar([FromBody] CuidadorRequest request)
        {
            var emailExiste = await _context.Cuidadores
                .AnyAsync(c => c.Email == request.Email);

            if (emailExiste)
            {
                return BadRequest("Este e-mail já está cadastrado.");
            }

            var cpfExiste = await _context.Cuidadores
                .AnyAsync(c => c.Cpf == request.Cpf);

            if (cpfExiste)
            {
                return BadRequest("Este CPF já está cadastrado.");
            }

            var cuidador = new Cuidador(
                request.Nome,
                request.Email,
                request.Senha,
                request.Cpf
            );

            _context.Cuidadores.Add(cuidador);

            await _context.SaveChangesAsync();

            return Ok("Cuidador cadastrado com sucesso.");
        }
    }

    public class CuidadorRequest
    {
        public string Nome { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Senha { get; set; } = string.Empty;

        public string Cpf { get; set; } = string.Empty;
    }
}