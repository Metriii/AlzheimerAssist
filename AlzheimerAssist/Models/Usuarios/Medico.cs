using System.ComponentModel.DataAnnotations;

namespace AlzheimerAssist.Models.Usuarios
{
    public class Medico : Usuario
    {
        [Required]
        public string Crm { get; private set; } = null!;
        public ICollection<MedicoPaciente> Pacientes { get; set; }
        = new List<MedicoPaciente>();

        public Medico()
        {

        }

        public Medico(
            string nome,
            string email,
            string senhaHash,
            string cpf,
            string crm)
            : base(
                nome,
                email,
                senhaHash,
                cpf)
        {
            Nome = nome;
            Email = email;
            DefinirSenhaHash(senhaHash);
            Cpf = cpf;
            Crm = crm;
        
        }
    }
}