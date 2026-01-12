import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const HOURLY_RATE = 9.5 / 24;

export default function Index() {
  const [balance, setBalance] = useState(125000);
  const [invested, setInvested] = useState(100000);
  const [withdrawn, setWithdrawn] = useState(15000);
  const [deposited, setDepositedTotal] = useState(115000);
  const [partners, setPartners] = useState(12);
  const [calcAmount, setCalcAmount] = useState(100000);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [referralEarnings, setReferralEarnings] = useState(3750);

  const netProfit = balance - invested;
  const dailyProfit = (invested * 9.5) / 100;
  const availableForWithdrawal = balance - invested;

  const transactions = [
    { id: 1, type: 'deposit', amount: 50000, date: '2026-01-12 14:30', status: 'completed' },
    { id: 2, type: 'profit', amount: 4750, date: '2026-01-12 09:00', status: 'completed' },
    { id: 3, type: 'withdrawal', amount: 10000, date: '2026-01-11 16:20', status: 'completed' },
    { id: 4, type: 'deposit', amount: 30000, date: '2026-01-10 11:15', status: 'completed' },
    { id: 5, type: 'withdrawal', amount: 5000, date: '2026-01-09 13:45', status: 'pending' },
  ];

  const referrals = [
    { id: 1, name: 'Пользователь #7821', earned: 1250, deposits: 50000, date: '2026-01-10' },
    { id: 2, name: 'Пользователь #4392', earned: 875, deposits: 35000, date: '2026-01-08' },
    { id: 3, name: 'Пользователь #9156', earned: 1625, deposits: 65000, date: '2026-01-05' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance((prev) => prev + (invested * HOURLY_RATE) / 100 / 3600);
    }, 1000);

    return () => clearInterval(interval);
  }, [invested]);

  const handleSubscribe = () => {
    window.open('https://t.me/yourchannel', '_blank');
    setTimeout(() => {
      setIsSubscribed(true);
      setBalance((prev) => prev + 100);
      toast.success('Бонус 100₽ зачислен на баланс!');
    }, 2000);
  };

  const handleDeposit = () => {
    toast.success('Откроется форма пополнения');
  };

  const handleWithdraw = () => {
    toast.success('Запрос на вывод отправлен');
  };

  const copyReferralLink = () => {
    const link = `https://t.me/yourbot?start=ref_12345`;
    navigator.clipboard.writeText(link);
    toast.success('Реферальная ссылка скопирована!');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-2xl mx-auto p-4 space-y-4">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur">
            <TabsTrigger value="home" className="data-[state=active]:bg-primary">
              <Icon name="Home" size={20} />
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-primary">
              <Icon name="PieChart" size={20} />
            </TabsTrigger>
            <TabsTrigger value="wallet" className="data-[state=active]:bg-primary">
              <Icon name="Wallet" size={20} />
            </TabsTrigger>
            <TabsTrigger value="bonuses" className="data-[state=active]:bg-primary">
              <Icon name="Gift" size={20} />
            </TabsTrigger>
            <TabsTrigger value="partners" className="data-[state=active]:bg-primary">
              <Icon name="Users" size={20} />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-4 mt-4">
            <Card className="p-6 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Общий баланс</p>
                <h1 className="text-4xl font-bold">{balance.toFixed(2)} ₽</h1>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-green-400">
                    <Icon name="TrendingUp" size={16} />
                    <span>+{dailyProfit.toFixed(2)} ₽/день</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Users" size={16} />
                    <span>{partners} партнеров</span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-3 gap-3">
              <Card className="p-4 text-center">
                <Icon name="Clock" size={24} className="mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground mb-1">Прибыль/час</p>
                <p className="font-bold">{((invested * HOURLY_RATE) / 100).toFixed(2)} ₽</p>
              </Card>
              <Card className="p-4 text-center">
                <Icon name="ArrowUpCircle" size={24} className="mx-auto mb-2 text-green-400" />
                <p className="text-xs text-muted-foreground mb-1">Пополнено</p>
                <p className="font-bold">{deposited.toLocaleString()} ₽</p>
              </Card>
              <Card className="p-4 text-center">
                <Icon name="ArrowDownCircle" size={24} className="mx-auto mb-2 text-red-400" />
                <p className="text-xs text-muted-foreground mb-1">Выведено</p>
                <p className="font-bold">{withdrawn.toLocaleString()} ₽</p>
              </Card>
            </div>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Icon name="History" size={18} />
                  История операций
                </h3>
              </div>
              <div className="space-y-2">
                {transactions.slice(0, 5).map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          tx.type === 'deposit'
                            ? 'bg-green-500/20'
                            : tx.type === 'withdrawal'
                            ? 'bg-red-500/20'
                            : 'bg-blue-500/20'
                        }`}
                      >
                        <Icon
                          name={
                            tx.type === 'deposit'
                              ? 'ArrowDownToLine'
                              : tx.type === 'withdrawal'
                              ? 'ArrowUpFromLine'
                              : 'TrendingUp'
                          }
                          size={16}
                          className={
                            tx.type === 'deposit'
                              ? 'text-green-400'
                              : tx.type === 'withdrawal'
                              ? 'text-red-400'
                              : 'text-blue-400'
                          }
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {tx.type === 'deposit'
                            ? 'Пополнение'
                            : tx.type === 'withdrawal'
                            ? 'Вывод'
                            : 'Прибыль'}
                        </p>
                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          tx.type === 'withdrawal' ? 'text-red-400' : 'text-green-400'
                        }`}
                      >
                        {tx.type === 'withdrawal' ? '-' : '+'}
                        {tx.amount.toLocaleString()} ₽
                      </p>
                      <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                        {tx.status === 'completed' ? 'Выполнено' : 'В обработке'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-4 mt-4">
            <Card className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Баланс</p>
                  <h2 className="text-3xl font-bold text-primary">{balance.toFixed(2)} ₽</h2>
                  <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                    <Icon name="TrendingUp" size={14} />
                    <span>В реальном времени</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Доход/сутки</p>
                  <h2 className="text-3xl font-bold text-green-400">+{dailyProfit.toFixed(2)} ₽</h2>
                  <p className="text-xs text-muted-foreground mt-1">9.5% в день</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Вложенные средства</p>
                  <p className="text-2xl font-semibold">{invested.toLocaleString()} ₽</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Чистый доход</p>
                  <p className="text-2xl font-semibold text-green-400">+{netProfit.toFixed(2)} ₽</p>
                  <Progress value={(netProfit / invested) * 100} className="mt-2 h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    ROI: {((netProfit / invested) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Icon name="Calculator" size={18} />
                Калькулятор доходности
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="calc-amount">Сумма инвестиции</Label>
                  <Input
                    id="calc-amount"
                    type="number"
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Прибыль/день</p>
                    <p className="text-xl font-bold text-green-400">
                      +{((calcAmount * 9.5) / 100).toFixed(2)} ₽
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Прибыль/месяц</p>
                    <p className="text-xl font-bold text-green-400">
                      +{((calcAmount * 9.5 * 30) / 100).toFixed(2)} ₽
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-4 mt-4">
            <Card className="p-6 bg-gradient-to-br from-green-500/20 to-blue-500/20">
              <p className="text-sm text-muted-foreground mb-1">Доступно для вывода</p>
              <h2 className="text-4xl font-bold">{availableForWithdrawal.toFixed(2)} ₽</h2>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              <Button onClick={handleDeposit} className="h-14 text-base" size="lg">
                <Icon name="Plus" size={20} className="mr-2" />
                Пополнить
              </Button>
              <Button onClick={handleWithdraw} variant="outline" className="h-14 text-base" size="lg">
                <Icon name="Minus" size={20} className="mr-2" />
                Вывести
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4">
                <Icon name="ArrowDownToLine" size={20} className="text-green-400 mb-2" />
                <p className="text-xs text-muted-foreground">Пополнено</p>
                <p className="text-lg font-bold">{deposited.toLocaleString()} ₽</p>
              </Card>
              <Card className="p-4">
                <Icon name="ArrowUpFromLine" size={20} className="text-red-400 mb-2" />
                <p className="text-xs text-muted-foreground">Выведено</p>
                <p className="text-lg font-bold">{withdrawn.toLocaleString()} ₽</p>
              </Card>
            </div>

            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="CreditCard" size={18} />
                Реквизиты для вывода
              </h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="CreditCard" size={18} className="mr-2" />
                  Добавить банковскую карту
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Bitcoin" size={18} className="mr-2" />
                  Добавить криптокошелек
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Средства на выводе</h3>
              <div className="p-4 bg-muted/30 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">На карту **** 4532</p>
                  <p className="text-xs text-muted-foreground">В обработке</p>
                </div>
                <p className="font-bold">5,000 ₽</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="bonuses" className="space-y-4 mt-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Icon name="Gift" size={20} />
                Бонусы и награды
              </h3>

              <div className="space-y-3">
                <Card className="p-4 bg-gradient-to-r from-primary/20 to-secondary/20">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">Подписка на канал</h4>
                      <p className="text-sm text-muted-foreground">Получи 100₽ на баланс</p>
                    </div>
                    <Badge variant={isSubscribed ? 'default' : 'secondary'}>
                      {isSubscribed ? 'Получено' : '+100₽'}
                    </Badge>
                  </div>
                  {!isSubscribed && (
                    <Button onClick={handleSubscribe} className="w-full">
                      <Icon name="CheckCircle" size={18} className="mr-2" />
                      Подписаться и получить бонус
                    </Button>
                  )}
                </Card>

                <Card className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">Пригласи друзей</h4>
                      <p className="text-sm text-muted-foreground">25 рефералов = 250₽</p>
                    </div>
                    <Badge variant="secondary">
                      {partners}/25
                    </Badge>
                  </div>
                  <Progress value={(partners / 25) * 100} className="mb-2" />
                  <p className="text-xs text-muted-foreground">
                    Осталось пригласить: {25 - partners} человек
                  </p>
                </Card>

                <Card className="p-4 bg-green-500/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">Реферальный доход</h4>
                      <p className="text-sm text-muted-foreground">25% от пополнений рефералов</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-400">
                        {referralEarnings.toLocaleString()} ₽
                      </p>
                      <p className="text-xs text-muted-foreground">Всего заработано</p>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="partners" className="space-y-4 mt-4">
            <Card className="p-6 bg-gradient-to-br from-primary/20 to-secondary/20">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Icon name="Users" size={20} />
                Программа лояльности
              </h3>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Партнеров</p>
                  <p className="text-3xl font-bold">{partners}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Доход</p>
                  <p className="text-3xl font-bold text-green-400">
                    {referralEarnings.toLocaleString()} ₽
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold mb-3">Ваша реферальная ссылка</h4>
              <div className="flex gap-2">
                <Input value="https://t.me/yourbot?start=ref_12345" readOnly className="font-mono text-sm" />
                <Button onClick={copyReferralLink} size="icon" className="shrink-0">
                  <Icon name="Copy" size={18} />
                </Button>
              </div>
              <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                <p className="text-sm font-medium mb-1">Ваша награда:</p>
                <p className="text-xs text-muted-foreground">
                  • 25% от всех пополнений рефералов
                  <br />
                  • 250₽ бонус за 25 приглашенных
                </p>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-3">Ваши рефералы</h4>
              <div className="space-y-2">
                {referrals.map((ref) => (
                  <div key={ref.id} className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{ref.name}</p>
                      <Badge variant="secondary" className="text-xs">
                        {ref.date}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Пополнил: {ref.deposits.toLocaleString()} ₽</span>
                      <span className="text-green-400 font-semibold">+{ref.earned.toLocaleString()} ₽</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
