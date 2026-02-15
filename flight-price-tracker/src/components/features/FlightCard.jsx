import React from 'react';
import { format } from 'date-fns';
import { Plane, Trash2, TrendingDown, ArrowRight, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const FlightCard = ({ flight, onDelete }) => {
    const statusConfig = {
        dropped: { color: 'success', label: 'Price Drop', icon: TrendingDown },
        watching: { color: 'warning', label: 'Watching', icon: Clock },
        increased: { color: 'destructive', label: 'Price Up', icon: TrendingDown }, // transform rotate-180
    };

    const status = statusConfig[flight.status] || statusConfig.watching;
    const StatusIcon = status.icon;

    return (
        <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border-slate-200/60 hover:border-brand-200 transition-all group">
            <CardContent className="p-0">
                {/* Header / Route */}
                <div className="p-6 border-b border-slate-100 flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="bg-brand-50 p-3 rounded-full text-brand-500">
                            <Plane className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="flex items-center space-x-2 text-xl font-bold text-slate-900">
                                <span>{flight.from}</span>
                                <ArrowRight className="h-4 w-4 text-slate-400" />
                                <span>{flight.to}</span>
                            </div>
                            <p className="text-sm text-slate-500 font-medium mt-1">
                                {format(new Date(flight.date), 'EEE, MMM d, yyyy')}
                            </p>
                        </div>
                    </div>
                    <Badge variant={status.color} className="capitalize">
                        {status.label}
                    </Badge>
                </div>

                {/* Stats */}
                <div className="p-6 grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Current Price</p>
                        <p className="text-2xl font-bold text-slate-900">₹{flight.currentPrice.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Target Price</p>
                        <p className="text-lg font-medium text-slate-600">₹{flight.targetPrice.toLocaleString()}</p>
                    </div>
                </div>

                {/* Footer / Actions */}
                <div className="bg-slate-50/50 p-4 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs text-slate-400">
                        Last checked: {format(new Date(flight.lastChecked), 'h:mm a')}
                    </p>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                        onClick={() => onDelete(flight.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export { FlightCard };
