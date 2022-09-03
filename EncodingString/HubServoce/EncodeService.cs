using Microsoft.AspNetCore.SignalR;
using System.Text;

namespace EncodingString.HubServoce
{
    public class EncodeService : Hub
    {
        public EncodeService()
        {
        }

        public async Task Initialize()
        {
            await Clients.All.SendAsync("InitReceiver", true);
        }

        public async Task EncodeString(string str)
        {
            var result = Convert.ToBase64String(Encoding.UTF8.GetBytes(str)).ToCharArray();

            foreach (var item in result)
            {
                if (Context.ConnectionAborted.IsCancellationRequested) break;

                var task = new List<Task>();
                task.AddRange(new Task[]
                    {
                        Task.Delay(TimeSpan.FromSeconds(new Random().Next(1,5))),
                        Task.Run(() =>
                        {
                            Clients.All.SendAsync("EncodeReceiver",item.ToString() );
                        })
                    });

                await Task.WhenAll(task);
            }
        }
    }
}
